// Helpers compartilhados entre generate-audio (polling) e suno-callback.

export const SUNO_BASE_URL = 'https://api.sunoapi.org/api/v1';

export interface AlignedWord {
  word:    string;
  startS:  number;
  endS:    number;
  success?: boolean;
}

export interface SunoTrack {
  audioUrl:       string | null;
  streamAudioUrl: string | null;
  audioId:        string | null;
  imageUrl:       string | null;
  duration:       number | null;
  modelName:      string | null;
  tags:           string | null;
}

// Aceita tanto camelCase (record-info / callback novo) quanto snake_case (callback antigo)
export function normalizeTrack(raw: Record<string, unknown>): SunoTrack {
  const s = (...keys: string[]): string | null => {
    for (const k of keys) {
      const v = raw[k];
      if (typeof v === 'string' && v.length > 0) return v;
    }
    return null;
  };
  const durationRaw = raw.duration ?? raw.durationS;
  return {
    audioUrl:       s('audioUrl', 'audio_url'),
    streamAudioUrl: s('streamAudioUrl', 'stream_audio_url'),
    audioId:        s('id', 'audioId', 'audio_id'),
    imageUrl:       s('imageUrl', 'image_url'),
    duration:       durationRaw != null ? Number(durationRaw) : null,
    modelName:      s('modelName', 'model_name'),
    tags:           s('tags'),
  };
}

// Colunas do Supabase a partir de um SunoTrack + letra sincronizada
export function trackToColumns(track: SunoTrack, alignedWords: AlignedWord[] | null): Record<string, unknown> {
  return {
    audio_url:        track.audioUrl,
    stream_audio_url: track.streamAudioUrl,
    audio_id:         track.audioId,
    image_url:        track.imageUrl,
    duration:         track.duration,
    model_name:       track.modelName,
    tags:             track.tags,
    aligned_words:    alignedWords,
  };
}

// Letra com timestamps por palavra (karaokê). Tenta algumas vezes pois a
// sincronia pode demorar um pouco a mais que o áudio.
export async function fetchTimestampedLyrics(
  taskId: string,
  audioId: string,
  maxAttempts = 6,
): Promise<AlignedWord[] | null> {
  const key = process.env.SUNO_API_KEY;
  if (!key) return null;

  for (let i = 0; i < maxAttempts; i++) {
    try {
      const res = await fetch(`${SUNO_BASE_URL}/generate/get-timestamped-lyrics`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${key}` },
        body: JSON.stringify({ taskId, audioId }),
      });

      if (res.ok) {
        const data = JSON.parse(await res.text()) as {
          data?: { alignedWords?: AlignedWord[] };
          alignedWords?: AlignedWord[];
        };
        const words = data.data?.alignedWords ?? data.alignedWords ?? null;
        if (words && words.length > 0) {
          console.log(`[Suno] alignedWords recebidos: ${words.length} palavras`);
          return words.map((w) => ({
            word:    w.word,
            startS:  Number(w.startS),
            endS:    Number(w.endS),
            success: w.success,
          }));
        }
      }
    } catch (err) {
      console.warn('[Suno] get-timestamped-lyrics falhou:', err);
    }
    await new Promise((r) => setTimeout(r, 4000));
  }
  console.warn('[Suno] sem letra sincronizada para taskId=', taskId);
  return null;
}
