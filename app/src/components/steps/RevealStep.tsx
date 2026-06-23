'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Badge }      from '@/components/ui/Badge';
import { Button }     from '@/components/ui/Button';
import { IconButton } from '@/components/ui/IconButton';
import { WaveBars }   from '@/components/ui/WaveBars';
import { downloadLyricsPdf, downloadChordsPdf } from '@/lib/pdf';

export interface AlignedWord {
  word:   string;
  startS: number;
  endS:   number;
  success?: boolean;
}

interface HymnResult {
  title: string;
  lyrics: string;
  chords: string;
  verses: string[];
  themes: string[];
  audioUrl?: string;
  alignedWords?: AlignedWord[] | null;
}

interface RevealStepProps {
  hymn: HymnResult;
  onRestart: () => void;
  /** id do hino — quando presente, o botão Compartilhar copia o link permanente */
  shareId?: string;
  /** mensagem opcional (ex: áudio expirado) */
  audioExpired?: boolean;
}

/* ── Helpers ─────────────────────────────────────────────── */

interface KaraokeLine { words: AlignedWord[]; startS: number; endS: number; }

function buildKaraokeLines(words: AlignedWord[]): KaraokeLine[] {
  const lines: KaraokeLine[] = [];
  let cur: AlignedWord[] = [];
  for (let i = 0; i < words.length; i++) {
    cur.push(words[i]);
    const w    = words[i].word.trim();
    const next = words[i + 1];
    const endsSentence = /[.,!?;:]$/.test(w);
    const gap = next ? next.startS - words[i].endS : Infinity;
    if (endsSentence || gap > 0.6 || cur.length >= 9) {
      lines.push({ words: cur, startS: cur[0].startS, endS: cur[cur.length - 1].endS });
      cur = [];
    }
  }
  if (cur.length) lines.push({ words: cur, startS: cur[0].startS, endS: cur[cur.length - 1].endS });
  return lines;
}

interface Section { heading: string; body: string[]; isChorus: boolean; }

function parseSections(lyrics: string): Section[] {
  return lyrics
    .split(/\n\s*\n/)
    .map((block) => {
      const lines = block.split('\n').map((l) => l.trim()).filter(Boolean);
      if (lines.length === 0) return null;
      const isLabel = /^(estrofe|refr[aã]o|ponte|coro|verso|bridge|chorus|intro|final)/i.test(lines[0]);
      const heading = isLabel ? lines[0] : '';
      const body    = isLabel ? lines.slice(1) : lines;
      const isChorus = /refr|coro|chorus/i.test(heading);
      return body.length ? { heading, body, isChorus } : null;
    })
    .filter((s): s is Section => s !== null);
}

/* ── Component ────────────────────────────────────────────── */

export function RevealStep({ hymn, onRestart, shareId, audioExpired = false }: RevealStepProps) {
  const [playing, setPlaying]     = useState(false);
  const [showLyrics, setShowLyrics] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [copied, setCopied]       = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const rafRef   = useRef<number | null>(null);

  const karaokeLines = useMemo(
    () => (hymn.alignedWords && hymn.alignedWords.length > 0 ? buildKaraokeLines(hymn.alignedWords) : []),
    [hymn.alignedWords],
  );
  const hasKaraoke = karaokeLines.length > 0;

  const sections = useMemo(() => parseSections(hymn.lyrics), [hymn.lyrics]);

  // Índice da linha cantada no momento
  const activeLineIdx = useMemo(() => {
    if (!hasKaraoke) return -1;
    let idx = -1;
    for (let i = 0; i < karaokeLines.length; i++) {
      if (currentTime >= karaokeLines[i].startS - 0.15) idx = i;
      else break;
    }
    return idx;
  }, [currentTime, karaokeLines, hasKaraoke]);

  // Loop de animação para acompanhar o tempo do áudio com suavidade
  useEffect(() => {
    if (!playing) {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      return;
    }
    const tick = () => {
      if (audioRef.current) setCurrentTime(audioRef.current.currentTime);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [playing]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    if (playing) audioRef.current.pause();
    else audioRef.current.play();
    setPlaying((p) => !p);
  };

  const handleDownloadMp3 = async () => {
    if (!hymn.audioUrl) return;
    const fileName = `${hymn.title.replace(/\s+/g, '_').replace(/[^\w\-]+/g, '') || 'hino'}.mp3`;
    try {
      const res  = await fetch(hymn.audioUrl);
      const blob = await res.blob();
      const url  = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // CORS ou rede: abre em nova aba como fallback
      window.open(hymn.audioUrl, '_blank');
    }
  };

  const shareUrl = shareId ? `${typeof window !== 'undefined' ? window.location.origin : ''}/hino/${shareId}` : '';

  const handleShare = async () => {
    const url = shareUrl || (typeof window !== 'undefined' ? window.location.href : '');
    if (navigator.share) {
      try { await navigator.share({ title: hymn.title, text: `${hymn.title} — um hino criado a partir de uma história`, url }); }
      catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const audioAvailable = !!hymn.audioUrl && !audioExpired;

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
        <div style={{ position: 'absolute', inset: 0, background: 'var(--wash-halo)', pointerEvents: 'none' }} />

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

          {/* Karaokê (se houver letra sincronizada) — senão, trecho da letra */}
          {hasKaraoke ? (
            <KaraokePanel lines={karaokeLines} activeIdx={activeLineIdx} currentTime={currentTime} playing={playing} />
          ) : (
            <p style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              fontSize: 19, lineHeight: 1.7, color: 'var(--text-body)',
              maxWidth: 440, margin: '4px 0 0', whiteSpace: 'pre-line',
            }}>
              {hymn.lyrics.split('\n').filter(Boolean).slice(0, 2).join('\n')}
            </p>
          )}

          {/* Player */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginTop: 6 }}>
            <IconButton
              icon={playing ? 'pause' : 'play'}
              variant="solid"
              size="lg"
              label={playing ? 'Pausar' : 'Tocar'}
              onClick={togglePlay}
              disabled={!audioAvailable}
            />
            <WaveBars playing={playing} bars={36} height={46} color="var(--gold-400)" />
          </div>

          {!audioAvailable && (
            <p style={{ fontSize: 13, color: 'var(--text-faint)', margin: 0 }}>
              {audioExpired ? 'O áudio deste hino expirou, mas a letra continua aqui.' : 'Áudio indisponível no momento.'}
            </p>
          )}

          {audioAvailable && (
            <audio
              ref={audioRef}
              src={hymn.audioUrl}
              onEnded={() => setPlaying(false)}
              onPause={() => setPlaying(false)}
              onPlay={() => setPlaying(true)}
              style={{ display: 'none' }}
            />
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', justifyContent: 'center', marginTop: 8 }}>
            <Button iconLeft="book" onClick={() => setShowLyrics((v) => !v)}>
              {showLyrics ? 'Fechar letra' : 'Ver letra completa'}
            </Button>
            <Button variant="secondary" iconLeft="download" onClick={handleDownloadMp3} disabled={!audioAvailable}>
              Baixar mp3
            </Button>
            <Button variant="ghost" iconLeft="share" onClick={handleShare}>
              {copied ? 'Link copiado!' : 'Compartilhar'}
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

      {/* Letra completa — folha de hino clássica */}
      {showLyrics && <HymnSheet hymn={hymn} sections={sections} />}
    </div>
  );
}

/* ── Karaokê ─────────────────────────────────────────────── */

function KaraokePanel({ lines, activeIdx, currentTime, playing }: {
  lines: KaraokeLine[]; activeIdx: number; currentTime: number; playing: boolean;
}) {
  const idx = activeIdx < 0 ? 0 : activeIdx;
  const prev = lines[idx - 1];
  const active = lines[idx];
  const next = lines[idx + 1];

  const renderLine = (line: KaraokeLine | undefined, variant: 'active' | 'dim') => {
    if (!line) return <div style={{ minHeight: 24 }} />;
    if (variant === 'dim') {
      return (
        <p style={{
          fontFamily: 'var(--font-serif)', fontStyle: 'italic',
          fontSize: 16, lineHeight: 1.5, color: 'var(--text-faint)',
          margin: 0, opacity: 0.7,
        }}>
          {line.words.map((w) => w.word).join(' ')}
        </p>
      );
    }
    return (
      <p style={{
        fontFamily: 'var(--font-serif)', fontWeight: 600,
        fontSize: 22, lineHeight: 1.5, margin: 0,
      }}>
        {line.words.map((w, i) => {
          const sung = playing ? currentTime >= w.startS : false;
          const isCurrent = playing && currentTime >= w.startS && currentTime < w.endS;
          return (
            <span
              key={i}
              style={{
                color: sung ? 'var(--accent-ink)' : 'var(--text-body)',
                transition: 'color 160ms var(--ease-out)',
                fontStyle: isCurrent ? 'normal' : 'normal',
                textShadow: isCurrent ? '0 0 14px var(--wash-halo)' : 'none',
              }}
            >
              {w.word}{i < line.words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </p>
    );
  };

  return (
    <div style={{
      width: 'min(460px, 88%)', minHeight: 132,
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      gap: 10, padding: '18px 20px',
      background: 'color-mix(in srgb, var(--surface-card) 55%, transparent)',
      borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)',
    }}>
      {renderLine(prev, 'dim')}
      {renderLine(active, 'active')}
      {renderLine(next, 'dim')}
    </div>
  );
}

/* ── Folha de hino clássica ──────────────────────────────── */

function HymnSheet({ hymn, sections }: { hymn: HymnResult; sections: Section[] }) {
  let verseNo = 0;
  return (
    <div style={{ marginTop: 32 }}>
      <div style={{
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-xl)',
        border: '1px solid var(--border)',
        boxShadow: 'var(--shadow-md)',
        padding: '48px 40px 44px',
        position: 'relative',
      }}>
        {/* Baixar letra (PDF) — canto superior direito */}
        <div style={{ position: 'absolute', top: 14, right: 14 }}>
          <Button size="sm" variant="ghost" iconLeft="download" onClick={() => downloadLyricsPdf(hymn)}>
            Baixar letra
          </Button>
        </div>

        {/* Cabeçalho da folha */}
        <div style={{ textAlign: 'center', marginBottom: 36 }}>
          <h2 style={{
            fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 30,
            letterSpacing: '-0.01em', color: 'var(--text-heading)', margin: '0 0 8px',
          }}>
            {hymn.title}
          </h2>
          <div style={{
            display: 'inline-block', width: 56, height: 2,
            background: 'var(--accent)', borderRadius: 'var(--radius-pill)',
          }} />
        </div>

        {/* Estrofes e refrões */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 28, textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
          {sections.map((s, i) => {
            if (!s.isChorus) verseNo += 1;
            return (
              <div
                key={i}
                style={{
                  position: 'relative',
                  padding: s.isChorus ? '14px 18px' : 0,
                  background: s.isChorus ? 'var(--bg-subtle)' : 'transparent',
                  borderRadius: s.isChorus ? 'var(--radius-md)' : 0,
                }}
              >
                <div style={{
                  fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700,
                  letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: s.isChorus ? 'var(--accent-ink)' : 'var(--text-faint)',
                  marginBottom: 10,
                }}>
                  {s.isChorus ? 'Refrão' : `${verseNo}ª Estrofe`}
                </div>
                {s.body.map((line, j) => (
                  <p
                    key={j}
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontStyle: s.isChorus ? 'italic' : 'normal',
                      fontSize: 18, lineHeight: 1.75,
                      color: s.isChorus ? 'var(--text-body)' : 'var(--text-heading)',
                      margin: 0,
                    }}
                  >
                    {line}
                  </p>
                ))}
              </div>
            );
          })}
        </div>

        {/* Versículos */}
        {hymn.verses.length > 0 && (
          <div style={{
            marginTop: 40, paddingTop: 24, borderTop: '1px solid var(--border)',
            maxWidth: 520, marginLeft: 'auto', marginRight: 'auto',
          }}>
            {hymn.verses.map((v, i) => (
              <p key={i} style={{
                fontFamily: 'var(--font-serif)', fontStyle: 'italic',
                fontSize: 14.5, lineHeight: 1.7, color: 'var(--text-muted)',
                textAlign: 'center', margin: i > 0 ? '10px 0 0' : 0,
              }}>
                {v}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* Cifra — card próprio com botão de download */}
      {hymn.chords && (
        <div style={{
          marginTop: 24, position: 'relative',
          background: 'var(--surface-card)', borderRadius: 'var(--radius-xl)',
          border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)',
          padding: '40px 32px 32px',
        }}>
          {/* Baixar cifra (PDF) — canto superior direito */}
          <div style={{ position: 'absolute', top: 14, right: 14 }}>
            <Button size="sm" variant="ghost" iconLeft="download" onClick={() => downloadChordsPdf(hymn)}>
              Baixar cifra
            </Button>
          </div>

          <h3 style={{
            fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 600,
            color: 'var(--text-heading)', margin: '0 0 12px', textAlign: 'center',
          }}>
            Cifra
          </h3>
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
  );
}
