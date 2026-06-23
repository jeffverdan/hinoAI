import { NextRequest, NextResponse } from 'next/server';
import { sunoResults } from '@/lib/suno-store';
import { createServerClient } from '@/lib/supabase';
import { normalizeTrack, trackToColumns, fetchTimestampedLyrics } from '@/lib/suno';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as {
      data?:
        | { callbackType?: string; task_id?: string; taskId?: string; data?: Record<string, unknown>[] }
        | Record<string, unknown>[];
      task_id?: string;
      taskId?:  string;
    };

    // Formato real da sunoapi.org: { code, msg, data: { callbackType, task_id, data: [ ... ] } }
    // Toleramos variações onde `data` é o próprio array ou os campos estão no root.
    const inner   = Array.isArray(body.data) ? null : body.data;
    const taskId  = inner?.task_id ?? inner?.taskId ?? body.task_id ?? body.taskId ?? null;
    const status  = inner?.callbackType ?? 'unknown';

    const tracks: Record<string, unknown>[] = Array.isArray(body.data) ? body.data : inner?.data ?? [];
    const rawTrack = tracks.find((t) => t.audio_url || t.audioUrl || t.stream_audio_url || t.streamAudioUrl);

    if (!taskId || !rawTrack) {
      return NextResponse.json({ ok: true });
    }

    const track = normalizeTrack(rawTrack);
    sunoResults.set(taskId, { track, status });
    console.log('[Suno] callback p/ taskId=', taskId, '| status=', status, '| audioUrl?', !!track.audioUrl);

    // Persiste direto no banco quando o áudio chega só pelo callback (sem polling).
    if (track.audioUrl || track.streamAudioUrl) {
      try {
        const db = createServerClient();
        const { data: hymn, error: findErr } = await db
          .from('hymns')
          .select('id')
          .eq('task_id', taskId)
          .limit(1)
          .maybeSingle();

        if (findErr) {
          console.warn('[Suno] callback: busca do hino falhou:', findErr.message);
        } else if (hymn?.id) {
          // Poucas tentativas: o webhook precisa responder rápido. Os timestamps
          // já costumam estar prontos quando o callback de "complete" chega.
          const alignedWords = track.audioId
            ? await fetchTimestampedLyrics(taskId, track.audioId, 2)
            : null;

          const { error: updErr } = await db
            .from('hymns')
            .update(trackToColumns(track, alignedWords))
            .eq('id', hymn.id);

          if (updErr) console.warn('[Suno] callback: update do hino falhou:', updErr.message);
          else console.log('[Suno] callback: hino', hymn.id, 'atualizado com áudio + karaokê');
        } else {
          console.warn('[Suno] callback: nenhum hino com task_id=', taskId);
        }
      } catch (e) {
        console.warn('[Suno] callback: erro ao persistir (non-fatal):', e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}
