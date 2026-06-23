/* eslint-disable react-hooks/set-state-in-effect */
'use client';
import { useEffect, useState } from 'react';
import { WaveBars }       from '@/components/ui/WaveBars';
import { ScriptureQuote } from '@/components/ui/ScriptureQuote';

const STAGES = [
  'Interpretando seu testemunho…',
  'Escolhendo o tema bíblico…',
  'Escrevendo a letra…',
  'Compondo a cifra…',
  'Gravando a voz…',
];

export interface HymnPreview {
  title:  string;
  lyrics: string;
  chords: string;
  themes?: string[];
}

interface GeneratingStepProps {
  progress: number;
  /** 'lyrics' = aguardando a Claude · 'audio' = letra pronta, gerando o áudio */
  phase?: 'lyrics' | 'audio';
  /** Prévia já gerada pela Claude, exibida enquanto o áudio é produzido */
  preview?: HymnPreview | null;
}

export function GeneratingStep({ progress, phase = 'lyrics', preview = null }: GeneratingStepProps) {
  const [stageIdx, setStageIdx] = useState(0);

  useEffect(() => {
    const mapped = Math.floor((progress / 100) * (STAGES.length - 1));
    setStageIdx(Math.min(mapped, STAGES.length - 1));
  }, [progress]);

  const showPreview = phase === 'audio' && !!preview;

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      textAlign: 'center', gap: 26, padding: '20px 0',
    }}>
      {/* Logo pulsante */}
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{
          position: 'absolute', width: 132, height: 132, borderRadius: '50%',
          background: 'var(--wash-halo)',
        }} />
        <span className="hino-pulse" style={{ position: 'relative', fontSize: 72, lineHeight: 1 }}>
          🎵
        </span>
      </div>

      <div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 34,
          lineHeight: 1.15, color: 'var(--text-heading)', margin: '0 0 10px',
        }}>
          {showPreview ? 'Sua letra está pronta' : 'Compondo seu hino'}
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', margin: 0, minHeight: 22 }}>
          {showPreview ? 'Agora estamos gravando a voz e a melodia…' : STAGES[stageIdx]}
        </p>
      </div>

      <WaveBars playing bars={32} height={44} />

      <div style={{ width: 320, maxWidth: '80%' }}>
        <div style={{
          height: 6, borderRadius: 'var(--radius-pill)',
          background: 'var(--bg-sunken)', overflow: 'hidden',
        }}>
          <div style={{
            height: '100%',
            width: `${progress}%`,
            background: 'var(--wash-gold)',
            borderRadius: 'var(--radius-pill)',
            transition: 'width 600ms var(--ease-out)',
          }} />
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 12,
          color: 'var(--text-faint)', marginTop: 8,
        }}>
          {progress}%
        </div>
      </div>

      {/* Prévia do que a Claude já gerou */}
      {showPreview && preview && <PreviewCard preview={preview} />}

      {!showPreview && (
        <div style={{ paddingTop: 8 }}>
          {/* <ScriptureQuote
            verse="Cantai ao Senhor um cântico novo."
            reference="Salmos 96:1"
            size="sm"
            align="center"
          /> */}
        </div>
      )}
    </div>
  );
}

function PreviewCard({ preview }: { preview: HymnPreview }) {
  const lyricLines = preview.lyrics
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    // .slice(0, 4);

  const chordLine = preview.chords
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)[0] ?? '';

  return (
    <div style={{
      width: 'min(440px, 90vw)', textAlign: 'left',
      background: 'var(--surface-card)', borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border)', boxShadow: 'var(--shadow-md)',
      padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: 16,
    }}>
      {/* Chip "gerando áudio" */}
      <div
        className="hino-preview-item"
        style={{
          alignSelf: 'flex-start', display: 'flex', alignItems: 'center', gap: 8,
          padding: '5px 12px', borderRadius: 'var(--radius-pill)',
          background: 'var(--bg-subtle)', fontSize: 12, fontWeight: 600,
          color: 'var(--text-muted)', letterSpacing: '.02em',
          animationDelay: '40ms',
        }}
      >
        <span className="hino-audio-chip__dot" />
        Gerando o áudio
      </div>

      {/* Título */}
      <h2
        className="hino-preview-item"
        style={{
          fontFamily: 'var(--font-display)', fontWeight: 600, fontSize: 26,
          lineHeight: 1.12, letterSpacing: '-0.02em',
          color: 'var(--text-heading)', margin: 0, animationDelay: '160ms',
        }}
      >
        {preview.title}
      </h2>

      {/* Temas */}
      {preview.themes && preview.themes.length > 0 && (
        <div
          className="hino-preview-item"
          style={{ display: 'flex', gap: 6, flexWrap: 'wrap', animationDelay: '260ms' }}
        >
          {preview.themes.map((t) => (
            <span key={t} style={{
              fontSize: 11.5, fontWeight: 600, color: 'var(--accent-ink)',
              background: 'var(--bg-subtle)', padding: '3px 10px',
              borderRadius: 'var(--radius-pill)',
            }}>
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Trecho da letra — linha a linha */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 160, overflowY: 'auto', paddingRight: 4 }}>
        {lyricLines.map((line, i) => (
          <p
            key={i}
            className="hino-preview-item"
            style={{
              fontFamily: 'var(--font-serif)', fontStyle: 'italic',
              fontSize: 16.5, lineHeight: 1.65, color: 'var(--text-body)',
              margin: 0, animationDelay: `${360 + i * 140}ms`,
            }}
          >
            {line}
          </p>
        ))}
      </div>

      {/* Cifra (primeira linha) */}
      {chordLine && (
        <div
          className="hino-preview-item"
          style={{
            fontFamily: 'var(--font-mono)', fontSize: 13, lineHeight: 1.7,
            background: 'var(--bg-sunken)', borderRadius: 'var(--radius-md)',
            padding: '12px 16px', boxShadow: 'var(--shadow-inset)',
            color: 'var(--text-muted)', overflowX: 'auto', whiteSpace: 'pre',
            animationDelay: `${360 + lyricLines.length * 140}ms`,
          }}
        >
          {chordLine}
        </div>
      )}

      <p
        className="hino-preview-item"
        style={{
          fontSize: 12.5, color: 'var(--text-faint)', margin: 0,
          animationDelay: `${480 + lyricLines.length * 140}ms`,
        }}
      >
        Isso pode levar alguns minutos — fique à vontade para ler enquanto a melodia é preparada.
      </p>
    </div>
  );
}
