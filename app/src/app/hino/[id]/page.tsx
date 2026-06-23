import { createServerClient } from '@/lib/supabase';
import { notFound } from 'next/navigation';
import { HymnView } from './HymnView';
import type { AlignedWord } from '@/components/steps/RevealStep';

export const dynamic = 'force-dynamic';

interface HinoPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: HinoPageProps) {
  const { id } = await params;
  try {
    const db = createServerClient();
    const { data } = await db.from('hymns').select('title').eq('id', id).single();
    if (data?.title) {
      return { title: `${data.title} — Hino.AI`, description: 'Um hino criado a partir de uma história de fé.' };
    }
  } catch { /* ignore */ }
  return { title: 'Hino — Hino.AI' };
}

export default async function HinoPage({ params }: HinoPageProps) {
  const { id } = await params;

  const db = createServerClient();
  const { data, error } = await db.from('hymns').select('*').eq('id', id).single();

  if (error || !data) notFound();

  // Página é force-dynamic (renderiza a cada request), então ler o horário atual é seguro.
  // eslint-disable-next-line react-hooks/purity
  const nowMs = Date.now();
  const expired = data.expires_at ? new Date(data.expires_at).getTime() < nowMs : false;

  const hymn = {
    title:        data.title as string,
    lyrics:       (data.lyrics as string) ?? '',
    chords:       (data.chords as string) ?? '',
    verses:       Array.isArray(data.verses) ? (data.verses as string[]) : [],
    themes:       Array.isArray(data.themes) ? (data.themes as string[]) : [],
    audioUrl:     (data.audio_url as string | null) ?? undefined,
    alignedWords: (data.aligned_words as AlignedWord[] | null) ?? null,
  };

  return <HymnView hymn={hymn} shareId={id} audioExpired={expired} />;
}
