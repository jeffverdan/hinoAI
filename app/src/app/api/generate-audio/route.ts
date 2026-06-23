import { NextRequest, NextResponse } from 'next/server';
import { buildSunoPrompt } from '@/lib/prompts';
import { sunoResults } from '@/lib/suno-store';
import { createServerClient } from '@/lib/supabase';
import {
  SUNO_BASE_URL,
  type AlignedWord,
  type SunoTrack,
  normalizeTrack,
  trackToColumns,
  fetchTimestampedLyrics,
} from '@/lib/suno';

// Permite que a rota fique aberta por até 5 min aguardando o áudio (Vercel)
export const maxDuration = 300;

export async function POST(req: NextRequest) {
  try {
    const { title, lyrics, style, tone, hymnId } = await req.json() as {
      title:  string;
      lyrics: string;
      style:  string;
      tone:   string;
      hymnId?: string | null;
    };

    console.log('[Suno] generate-audio chamado | hymnId=', hymnId);

    if (!process.env.SUNO_API_KEY) {
      console.error('[Suno] SUNO_API_KEY ausente no ambiente');
      return NextResponse.json({ audioUrl: null, alignedWords: null, message: 'SUNO_API_KEY não configurada.' });
    }

    const stylePrompt = buildSunoPrompt({ title, style, tone });

    const host        = req.headers.get('host') ?? 'localhost:3000';
    const protocol    = host.startsWith('localhost') || host.startsWith('127.') ? 'http' : 'https';
    const callBackUrl = `${protocol}://${host}/api/suno-callback`;

    const genRes = await fetch(`${SUNO_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${process.env.SUNO_API_KEY}`,
      },
      body: JSON.stringify({
        customMode:   true,
        instrumental: false,
        model:        'V4_5ALL',
        title,
        prompt:       lyrics,
        style:        stylePrompt,
        vocalGender:  'f',
        callBackUrl,
      }),
    });

    const rawText = await genRes.text();
    console.log('[Suno] POST /generate status:', genRes.status);
    console.log('[Suno] POST /generate body:', rawText);

    if (!genRes.ok) {
      console.error('[Suno] generate error:', rawText);
      return NextResponse.json({ audioUrl: null, alignedWords: null, message: 'Erro ao iniciar geração de áudio.' });
    }

    let genData: unknown;
    try { genData = JSON.parse(rawText); } catch {
      console.error('[Suno] JSON parse error:', rawText);
      return NextResponse.json({ audioUrl: null, alignedWords: null, message: 'Resposta inválida do Suno.' });
    }

    const songId = extractId(genData);
    console.log('[Suno] songId (taskId) extraído:', songId);

    if (!songId) {
      console.error('[Suno] ID não encontrado na resposta:', rawText);
      return NextResponse.json({ audioUrl: null, alignedWords: null, message: 'ID do áudio não retornado.' });
    }

    // Vincula o taskId ao hino imediatamente — assim o callback consegue
    // localizar a linha e salvar o áudio mesmo que o polling não conclua.
    if (hymnId) {
      try {
        const db = createServerClient();
        const { error } = await db.from('hymns').update({ task_id: songId }).eq('id', hymnId);
        if (error) console.warn('[Suno] vínculo task_id falhou:', error.message);
      } catch (e) {
        console.warn('[Suno] vínculo task_id falhou:', e);
      }
    }

    const track = await pollSunoStatus(songId);
    console.log('[Suno] resultado final:', track);

    let alignedWords: AlignedWord[] | null = null;
    if (track?.audioUrl && track.audioId) {
      alignedWords = await fetchTimestampedLyrics(songId, track.audioId);
    }

    // Persiste o áudio e todos os campos do Suno na linha do hino
    if (hymnId && track?.audioUrl) {
      try {
        const db = createServerClient();
        const { error } = await db.from('hymns')
          .update({ task_id: songId, ...trackToColumns(track, alignedWords) })
          .eq('id', hymnId);
        if (error) console.warn('[Suno] update hino falhou (non-fatal):', error.message);
      } catch (dbErr) {
        console.warn('[Suno] update hino falhou (non-fatal):', dbErr);
      }
    }

    return NextResponse.json({ audioUrl: track?.audioUrl ?? null, alignedWords });

  } catch (err: unknown) {
    console.error('[Suno] generate-audio error:', err);
    const message = err instanceof Error ? err.message : 'Erro interno';
    return NextResponse.json({ audioUrl: null, alignedWords: null, message }, { status: 500 });
  }
}

// Extrai o taskId da resposta do POST /generate (suporta variações de formato)
function extractId(data: unknown): string | null {
  if (!data || typeof data !== 'object') return null;
  const d = data as Record<string, unknown>;

  if (Array.isArray(d.data) && d.data.length > 0) {
    const first = d.data[0] as Record<string, unknown>;
    return (first.id ?? first.task_id ?? first.taskId ?? null) as string | null;
  }
  if (d.data && typeof d.data === 'object' && !Array.isArray(d.data)) {
    const inner = d.data as Record<string, unknown>;
    return (inner.id ?? inner.task_id ?? inner.taskId ?? null) as string | null;
  }
  return (d.id ?? d.task_id ?? d.taskId ?? null) as string | null;
}

// 58 tentativas × 5s ≈ 290s (~5 min), dentro do maxDuration de 300s
async function pollSunoStatus(songId: string, maxAttempts = 58): Promise<SunoTrack | null> {
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(5000);
    console.log(`[Suno] poll tentativa ${i + 1}/${maxAttempts} para id=${songId}`);

    // 1. Callback já entregou?
    const cached = sunoResults.get(songId);
    if (cached?.track.audioUrl || cached?.track.streamAudioUrl) {
      sunoResults.delete(songId);
      return cached.track;
    }

    // 2. Polling direto
    const track = await checkSunoStatus(songId);
    if (track) return track;
  }
  console.warn('[Suno] timeout no polling para id=', songId);
  return null;
}

// Status de erro conhecidos do record-info da sunoapi.org
const SUNO_FAIL_STATUS = new Set([
  'CREATE_TASK_FAILED',
  'GENERATE_AUDIO_FAILED',
  'CALLBACK_EXCEPTION',
  'SENSITIVE_WORD_ERROR',
]);

interface RecordInfoResponse {
  code?: number;
  msg?:  string;
  data?: {
    taskId?: string;
    status?: string;   // PENDING | TEXT_SUCCESS | FIRST_SUCCESS | SUCCESS | *_FAILED ...
    response?: { taskId?: string; sunoData?: Record<string, unknown>[] };
    sunoData?: Record<string, unknown>[];
  };
}

async function checkSunoStatus(songId: string): Promise<SunoTrack | null> {
  const url = `${SUNO_BASE_URL}/generate/record-info?taskId=${songId}`;
  try {
    const res = await fetch(url, {
      headers: { 'Authorization': `Bearer ${process.env.SUNO_API_KEY!}` },
    });
    if (!res.ok) {
      console.warn(`[Suno] record-info HTTP ${res.status}`);
      return null;
    }

    const raw  = await res.text();
    const json = JSON.parse(raw) as RecordInfoResponse;
    const data = json.data;
    console.log('[Suno] record-info status:', data?.status, '| body:', raw.slice(0, 300));

    if (!data) return null;

    const status = (data.status ?? '').toUpperCase();
    if (SUNO_FAIL_STATUS.has(status)) {
      console.error('[Suno] geração falhou — status:', status);
      return null;
    }

    const sunoData = data.response?.sunoData ?? data.sunoData ?? [];
    const rawTrack = sunoData.find((t) => t.audioUrl || t.streamAudioUrl || t.audio_url || t.stream_audio_url);

    if (rawTrack && (status === 'SUCCESS' || status === 'FIRST_SUCCESS')) {
      const track = normalizeTrack(rawTrack);
      if (track.audioUrl || track.streamAudioUrl) return track;
    }

    // Ainda processando (PENDING / TEXT_SUCCESS) — segue no polling
    return null;
  } catch (err) {
    console.warn('[Suno] erro ao consultar record-info:', err);
    return null;
  }
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
