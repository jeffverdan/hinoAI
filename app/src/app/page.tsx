'use client';
import { useState } from 'react';
import { StoryStep }      from '@/components/steps/StoryStep';
import { StyleStep }      from '@/components/steps/StyleStep';
import { GeneratingStep } from '@/components/steps/GeneratingStep';
import type { HymnPreview } from '@/components/steps/GeneratingStep';
import { RevealStep }     from '@/components/steps/RevealStep';
import type { AlignedWord } from '@/components/steps/RevealStep';

type Step = 'story' | 'style' | 'generating' | 'reveal';
type GenPhase = 'lyrics' | 'audio';

interface HymnResult {
  title: string;
  lyrics: string;
  chords: string;
  verses: string[];
  theme: string;
  themes: string[];
  audioUrl?: string;
  alignedWords?: AlignedWord[] | null;
}

const INITIAL: HymnResult = { title: '', lyrics: '', chords: '', verses: [], theme: '', themes: [] };

export default function Home() {
  const [step, setStep]         = useState<Step>('story');
  const [story, setStory]       = useState('');
  const [themes, setThemes]     = useState<string[]>([]);
  const [style, setStyle]       = useState('');
  const [tone, setTone]         = useState('Alegre');
  const [video, setVideo]       = useState(false);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase]       = useState<GenPhase>('lyrics');
  const [preview, setPreview]   = useState<HymnPreview | null>(null);
  const [hymn, setHymn]         = useState<HymnResult>(INITIAL);
  const [hymnId, setHymnId]     = useState<string | null>(null);
  const [error, setError]       = useState<string | null>(null);

  const toggleTheme = (t: string) =>
    setThemes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

  const handleCreate = async () => {
    setError(null);
    setProgress(0);
    setPreview(null);
    setPhase('lyrics');
    setStep('generating');

    // Fase 1 — letra (Claude): progresso simulado até 55%
    let lyricsTimer: ReturnType<typeof setInterval> | null = setInterval(() => {
      setProgress((p) => {
        if (p >= 55) { if (lyricsTimer) clearInterval(lyricsTimer); return 55; }
        return Math.min(p + Math.random() * 6, 55);
      });
    }, 700);

    // Fase 2 — áudio (Suno): avança devagar de 55% até 97% ao longo de ~5min
    let audioTimer: ReturnType<typeof setInterval> | null = null;

    try {
      // 1. Gerar letra com Claude
      const lyricsRes = await fetch('/api/generate-lyrics', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ story, style, tone, themes }),
      });

      const lyricsData = await lyricsRes.json() as {
        hymn?: { title: string; lyrics: string; chords: string; verses: string[]; theme: string };
        id?: string | null;
        error?: string;
      };

      if (!lyricsRes.ok || !lyricsData.hymn) {
        throw new Error(lyricsData.error || 'Erro ao gerar a letra.');
      }

      const newHymnId = lyricsData.id ?? null;
      setHymnId(newHymnId);

      // Letra pronta → mostra a prévia e entra na fase de áudio
      if (lyricsTimer) { clearInterval(lyricsTimer); lyricsTimer = null; }
      setPreview({
        title:  lyricsData.hymn.title,
        lyrics: lyricsData.hymn.lyrics,
        chords: lyricsData.hymn.chords,
        themes,
      });
      setPhase('audio');
      setProgress(58);

      // Sobe ~0.13%/tick (≈ de 58% a 97% em ~5min)
      audioTimer = setInterval(() => {
        setProgress((p) => (p >= 97 ? 97 : Math.min(p + 0.13, 97)));
      }, 1000);

      // 2. Gerar áudio com Suno (não bloqueia se falhar)
      let audioUrl: string | null = null;
      let alignedWords: AlignedWord[] | null = null;
      try {
        const audioRes  = await fetch('/api/generate-audio', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: lyricsData.hymn.title, lyrics: lyricsData.hymn.lyrics, style, tone, hymnId: newHymnId }),
        });
        const audioData = await audioRes.json() as { audioUrl?: string | null; alignedWords?: AlignedWord[] | null };
        audioUrl     = audioData.audioUrl ?? null;
        alignedWords = audioData.alignedWords ?? null;
      } catch {
        console.warn('Áudio indisponível — continuando sem ele.');
      }

      if (audioTimer) { clearInterval(audioTimer); audioTimer = null; }
      setProgress(100);
      setHymn({ ...lyricsData.hymn, themes, audioUrl: audioUrl ?? undefined, alignedWords });

      await new Promise((r) => setTimeout(r, 600));
      setStep('reveal');
    } catch (err) {
      if (lyricsTimer) clearInterval(lyricsTimer);
      if (audioTimer) clearInterval(audioTimer);
      setProgress(0);
      setPreview(null);
      setPhase('lyrics');
      setError(err instanceof Error ? err.message : 'Algo não saiu como esperávamos. Vamos tentar de novo?');
      setStep('style');
    }
  };

  const handleRestart = () => {
    setStep('story'); setStory(''); setThemes([]);
    setStyle(''); setTone('Alegre'); setVideo(false);
    setHymn(INITIAL); setError(null); setProgress(0);
    setPreview(null); setPhase('lyrics'); setHymnId(null);
  };

  const isGenerating = step === 'generating';
  const isReveal     = step === 'reveal';

  return (
    <main className="hino-main" style={{
      minHeight: '100vh',
      background: 'var(--wash-dawn)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px var(--gutter) 32px',
    }}>
      {/* Header */}
      <header className="hino-app-header" style={{
        width: '100%', maxWidth: 'var(--container-lg)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 56,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }} onClick={handleRestart}>
          <span style={{ fontSize: 28 }}>🎵</span>
          <span style={{
            fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: 22,
            color: 'var(--text-heading)', letterSpacing: '-0.02em',
          }}>
            Hino<span style={{ color: 'var(--accent-ink)' }}>.AI</span>
          </span>
        </div>
        <p style={{ fontSize: 13, color: 'var(--text-faint)', margin: 0, fontStyle: 'italic' }}>
          Seu hino, sua história
        </p>
      </header>

      {/* Card */}
      <div style={{
        width: '100%',
        maxWidth: isReveal ? 'var(--container-md)' : step === 'style' ? '558px' : 'var(--container-sm)',
        background: isGenerating ? 'transparent' : 'var(--surface-card)',
        borderRadius: 'var(--radius-xl)',
        boxShadow: isGenerating ? 'none' : 'var(--shadow-lg)',
        border: isGenerating ? 'none' : '1px solid var(--border)',
        padding: isGenerating ? '0' : isReveal ? '0' : '40px 44px',
        transition: 'max-width var(--dur-slow) var(--ease-out)',
      }}>
        {error && (
          <div style={{
            marginBottom: 20, padding: '12px 16px',
            background: 'var(--danger-soft)', borderRadius: 'var(--radius-md)',
            border: '1px solid color-mix(in srgb, var(--danger) 30%, transparent)',
            color: 'var(--danger)', fontSize: 14,
          }}>
            {error}
          </div>
        )}

        {step === 'story' && (
          <StoryStep
            story={story} setStory={setStory}
            themes={themes} toggleTheme={toggleTheme}
            onNext={() => setStep('style')}
          />
        )}
        {step === 'style' && (
          <StyleStep
            style={style} setStyle={setStyle}
            tone={tone}   setTone={setTone}
            video={video} setVideo={setVideo}
            onBack={() => setStep('story')}
            onCreate={handleCreate}
          />
        )}
        {step === 'generating' && (
          <GeneratingStep progress={Math.round(progress)} phase={phase} preview={preview} />
        )}
        {step === 'reveal'     && <RevealStep hymn={hymn} onRestart={handleRestart} shareId={hymnId ?? undefined} />}
      </div>

      <footer className='footer-vers' style={{ marginTop: 48, fontSize: 12, color: 'var(--text-faint)', textAlign: 'center' }}>
        <em>&quot;Cantai ao Senhor um cântico novo.&quot; — Salmos 96:1</em>
      </footer>
    </main>
  );
}
