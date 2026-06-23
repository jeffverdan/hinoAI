'use client';
import { useRef, useState } from 'react';
import { Badge }      from '@/components/ui/Badge';
import { Button }     from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { WaveBars }   from '@/components/ui/WaveBars';

interface HymnResult {
  title: string;
  lyrics: string;
  chords: string;
  verses: string[];
  themes: string[];
  audioUrl?: string;
}

interface RevealStepProps {
  hymn: HymnResult;
  onRestart: () => void;
}

export function RevealStep({ hymn, onRestart }: RevealStepProps) {
  const [playing, setPlaying] = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setPlaying((p) => !p);
  };

  const handleDownloadLyrics = () => {
    const text = `${hymn.title}\n\n${hymn.lyrics}\n\n---\n${hymn.chords}\n\n${hymn.verses.join('\n')}`;
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${hymn.title.replace(/\s+/g, '_')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: hymn.title, text: hymn.lyrics.slice(0, 200) + '…' });
      } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert('Link copiado!');
    }
  };

  return (
    <div>
      {/* Reveal card — sanctuary theme */}
      <div
        data-theme="sanctuary"
        className="hino-reveal"
        style={{
          background: 'var(--wash-sanctuary)',
          borderRadius: 'var(--radius-xl)',
          padding: '46px 40px',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center',
          boxShadow: 'var(--shadow-xl)',
        }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          background: 'var(--wash-halo)', pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22 }}>
          <Badge tone="solid">Seu hino está pronto</Badge>

          <h1 style={{
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 48,
            lineHeight: 1.08, letterSpacing: '-0.02em', color: 'var(--text-heading)', margin: 0,
          }}>
            {hymn.title}
          </h1>

          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
            {hymn.themes.map((t) => <Badge key={t} tone="gold">{t}</Badge>)}
          </div>

          {/* Trecho da letra */}
          <p style={{
            fontFamily: 'var(--font-serif)', fontStyle: 'italic',
            fontSize: 19, lineHeight: 1.7, color: 'var(--text-body)',
            maxWidth: 440, margin: '4px 0 0',
          }}>
            {hymn.lyrics.split('\n').slice(0, 2).join('\n')}
          </p>

          {/* Player */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 6 }}>
            <IconButton
              icon={playing ? 'pause' : 'play'}
              variant="solid"
              size="lg"
              label={playing ? 'Pausar' : 'Tocar'}
              onClick={togglePlay}
              disabled={!hymn.audioUrl}
            />
            <WaveBars playing={playing} bars={36} height={46} color="var(--gold-400)" />
          </div>

          {hymn.audioUrl && (
            <audio
              ref={audioRef}
              src={hymn.audioUrl}
              onEnded={() => setPlaying(false)}
              style={{ display: 'none' }}
            />
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
            <Button iconLeft="book" onClick={() => setShowLyrics((v) => !v)}>
              {showLyrics ? 'Fechar letra' : 'Ver letra completa'}
            </Button>
            <Button variant="secondary" iconLeft="download" onClick={handleDownloadLyrics}>
              Baixar
            </Button>
            <Button variant="ghost" iconLeft="share" onClick={handleShare}>
              Compartilhar
            </Button>
          </div>

          <button
            type="button"
            onClick={onRestart}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              color: 'var(--text-muted)', fontFamily: 'var(--font-sans)',
              fontSize: 13.5, marginTop: 4, textDecoration: 'underline', textUnderlineOffset: 3,
            }}
          >
            Criar outro hino
          </button>
        </div>
      </div>

      {/* Letra e cifra completas */}
      {showLyrics && (
        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Versículos */}
          {hymn.verses.length > 0 && (
            <div style={{
              background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)',
              padding: '16px 20px', borderLeft: '3px solid var(--accent)',
            }}>
              {hymn.verses.map((v, i) => (
                <p key={i} style={{
                  fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                  fontSize: 15, color: 'var(--text-muted)', margin: i > 0 ? '8px 0 0' : 0,
                }}>
                  {v}
                </p>
              ))}
            </div>
          )}

          {/* Letra */}
          <div>
            <h2 style={{
              fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600,
              color: 'var(--text-heading)', margin: '0 0 16px',
            }}>
              Letra
            </h2>
            <div style={{
              fontFamily: 'var(--font-serif)', fontSize: 17,
              lineHeight: 1.8, color: 'var(--text-body)', whiteSpace: 'pre-wrap',
            }}>
              {hymn.lyrics}
            </div>
          </div>

          {/* Cifra */}
          {hymn.chords && (
            <div>
              <h2 style={{
                fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 600,
                color: 'var(--text-heading)', margin: '0 0 16px',
              }}>
                Cifra
              </h2>
              <div style={{
                fontFamily: 'var(--font-mono)', fontSize: 14, lineHeight: 1.9,
                background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)',
                padding: '20px 24px', boxShadow: 'var(--shadow-inset)',
                whiteSpace: 'pre-wrap', color: 'var(--text-body)', overflowX: 'auto',
              }}>
                {hymn.chords}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
