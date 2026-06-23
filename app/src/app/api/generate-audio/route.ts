import { NextRequest, NextResponse } from 'next/server';
import { buildSunoPrompt } from '@/lib/prompts';

// Suno API wrapper — compatível com o endpoint comunitário mais comum.
// Ajuste a BASE_URL conforme o provider que você usa (suno.com official ou proxy).
const SUNO_BASE_URL = 'https://api.sunoaiapi.com/api/v1';

export async function POST(req: NextRequest) {
  try {
    const { title, lyrics, style, tone } = await req.json() as {
      title:  string;
      lyrics: string;
      style:  string;
      tone:   string;
    };

    if (!process.env.SUNO_API_KEY) {
      // Retorna URL vazia em dev sem a chave configurada
      return NextResponse.json({ audioUrl: null, message: 'SUNO_API_KEY não configurada.' });
    }

    const prompt = buildSunoPrompt({ title, style, tone });

    // Dispara geração
    const genRes = await fetch(`${SUNO_BASE_URL}/gateway/generate/music`, {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'api-key':       process.env.SUNO_API_KEY,
      },
      body: JSON.stringify({
        title,
        tags:         prompt,
        prompt:       lyrics,
        mv:           'chirp-v3-5',
        continue_at:  0,
        continue_clip_id: '',
      }),
    });

    if (!genRes.ok) {
      const errText = await genRes.text();
      console.error('Suno generate error:', errText);
      return NextResponse.json({ audioUrl: null, message: 'Erro ao iniciar geração de áudio.' });
    }

    const genData = await genRes.json() as { data?: { song_id: string }[] };
    const songId = genData?.data?.[0]?.song_id;

    if (!songId) {
      return NextResponse.json({ audioUrl: null, message: 'ID do áudio não retornado.' });
    }

    // Polling — aguarda até 90s para o áudio ficar pronto
    const audioUrl = await pollSunoStatus(songId);
    return NextResponse.json({ audioUrl });
  } catch (err: unknown) {
    console.error('generate-audio error:', err);
    const message = err instanceof Error ? err.message : 'Erro interno';
    return NextResponse.json({ audioUrl: null, message }, { status: 500 });
  }
}

async function pollSunoStatus(songId: string, maxAttempts = 18): Promise<string | null> {
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(5000);

    const res = await fetch(`${SUNO_BASE_URL}/gateway/feed/${songId}`, {
      headers: { 'api-key': process.env.SUNO_API_KEY! },
    });

    if (!res.ok) continue;

    const data = await res.json() as { data?: { status: string; audio_url?: string }[] };
    const track = data?.data?.[0];

    if (track?.status === 'complete' && track?.audio_url) {
      return track.audio_url;
    }
    if (track?.status === 'error') {
      console.error('Suno track error for', songId);
      return null;
    }
  }
  return null; // timeout
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
