'use client';
import { useState } from 'react';
import { StoryStep }      from '@/components/steps/StoryStep';
import { StyleStep }      from '@/components/steps/StyleStep';
import { GeneratingStep } from '@/components/steps/GeneratingStep';
import { RevealStep }     from '@/components/steps/RevealStep';

type Step = 'story' | 'style' | 'generating' | 'reveal';

interface HymnResult {
  title: string;
  lyrics: string;
  chords: string;
  verses: string[];
  theme: string;
  themes: string[];
  audioUrl?: string;
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
  const [hymn, setHymn]         = useState<HymnResult>(INITIAL);
  const [error, setError]       = useState<string | null>(null);

  const toggleTheme = (t: string) =>
    setThemes((prev) => prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]);

  const handleCreate = async () => {
    setError(null);
    setProgress(0);
    setStep('generating');

    // Progresso simulado até 85% enquanto aguarda a API
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 85) { clearInterval(timer); return 85; }
        return Math.min(p + Math.random() * 6, 85);
      });
    }, 800);

    try {
      // 1. Gerar letra com Claude
      const lyricsRes = await fetch('/api/generate-lyrics', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ story, style, tone, themes }),
      });

      const lyricsData = await lyricsRes.json() as {
        hymn?: { title: string; lyrics: string; chords: string; verses: string[]; theme: string };
        error?: string;
      };

      if (!lyricsRes.ok || !lyricsData.hymn) {
        throw new Error(lyricsData.error || 'Erro ao gerar a letra.');
      }

      setProgress(70);

      // 2. Gerar áudio com Suno (não bloqueia se falhar)
      let audioUrl: string | null = null;
      try {
        const audioRes  = await fetch('/api/generate-audio', {
          method:  'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: lyricsData.hymn.title, lyrics: lyricsData.hymn.lyrics, style, tone }),
        });
        const audioData = await audioRes.json() as { audioUrl?: string | null };
        audioUrl = audioData.audioUrl ?? null;
      } catch {
        console.warn('Áudio indisponível — continuando sem ele.');
      }

      clearInterval(timer);
      setProgress(100);
      setHymn({ ...lyricsData.hymn, themes, audioUrl: audioUrl ?? undefined });

      await new Promise((r) => setTimeout(r, 600));
      setStep('reveal');
    } catch (err) {
      clearInterval(timer);
      setProgress(0);
      setError(err instanceof Error ? err.message : 'Algo não saiu como esperávamos. Vamos tentar de novo?');
      setStep('style');
    }
  };

  const handleRestart = () => {
    setStep('story'); setStory(''); setThemes([]);
    setStyle(''); setTone('Alegre'); setVideo(false);
    setHymn(INITIAL); setError(null); setProgress(0);
  };

  const isGenerating = step === 'generating';
  const isReveal     = step === 'reveal';

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--wash-dawn)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '40px var(--gutter) 80px',
    }}>
      {/* Header */}
      <header style={{
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
        maxWidth: isReveal ? 'var(--container-md)' : 'var(--container-sm)',
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
        {step === 'generating' && <GeneratingStep progress={Math.round(progress)} />}
        {step === 'reveal'     && <RevealStep hymn={hymn} onRestart={handleRestart} />}
      </div>

      <footer style={{ marginTop: 48, fontSize: 12, color: 'var(--text-faint)', textAlign: 'center' }}>
        <em>"Cantai ao Senhor um cântico novo." — Salmos 96:1</em>
      </footer>
    </main>
  );
}
