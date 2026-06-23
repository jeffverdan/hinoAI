import { NextRequest, NextResponse } from 'next/server';
import { buildSunoPrompt } from '@/lib/prompts';

const SUNO_BASE_URL = 'https://api.sunoapi.org/api/v1';

export async function POST(req: NextRequest) {
  try {
    const { title, lyrics, style, tone } = await req.json() as {
      title:  string;
      lyrics: string;
      style:  string;
      tone:   string;
    };

    if (!process.env.SUNO_API_KEY) {
      return NextResponse.json({ audioUrl: null, message: 'SUNO_API_KEY não configurada.' });
    }

    const stylePrompt = buildSunoPrompt({ title, style, tone });

    // Dispara geração
    const genRes = await fetch(`${SUNO_BASE_URL}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.SUNO_API_KEY}`,
      },
      body: JSON.stringify({
        customMode:   true,
        instrumental: false,
        model:        'V4_5ALL',
        title,
        prompt:       lyrics,   // letra completa
        style:        stylePrompt,
        vocalGender:  'f',      // voz feminina — padrão para hinos adventistas
      }),
    });

    if (!genRes.ok) {
      const errText = await genRes.text();
      console.error('Suno generate error:', errText);
      return NextResponse.json({ audioUrl: null, message: 'Erro ao iniciar geração de áudio.' });
    }

    const genData = await genRes.json() as { data?: { id: string }[] };
    const songId = genData?.data?.[0]?.id;

    if (!songId) {
      console.error('Suno response sem ID:', JSON.stringify(genData));
      return NextResponse.json({ audioUrl: null, message: 'ID do áudio não retornado.' });
    }

    // Polling — aguarda até 90s
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

    const res = await fetch(`${SUNO_BASE_URL}/generate/${songId}`, {
      headers: { 'Authorization': `Bearer ${process.env.SUNO_API_KEY!}` },
    });

    if (!res.ok) continue;

    const data = await res.json() as {
      data?: { status: string; audio_url?: string; stream_audio_url?: string }[]
    };
    const track = data?.data?.[0];

    if (track?.status === 'complete' && (track?.audio_url || track?.stream_audio_url)) {
      return track.audio_url ?? track.stream_audio_url ?? null;
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
