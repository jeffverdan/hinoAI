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

interface GeneratingStepProps {
  progress: number;
}

export function GeneratingStep({ progress }: GeneratingStepProps) {
  const [stageIdx, setStageIdx] = useState(0);

  useEffect(() => {
    const mapped = Math.floor((progress / 100) * (STAGES.length - 1));
    setStageIdx(Math.min(mapped, STAGES.length - 1));
  }, [progress]);

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
          Compondo seu hino
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text-muted)', margin: 0, minHeight: 22 }}>
          {STAGES[stageIdx]}
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
            transition: 'width 400ms var(--ease-out)',
          }} />
        </div>
        <div style={{
          fontFamily: 'var(--font-mono)', fontSize: 12,
          color: 'var(--text-faint)', marginTop: 8,
        }}>
          {progress}%
        </div>
      </div>

      <div style={{ paddingTop: 8 }}>
        <ScriptureQuote
          verse="Cantai ao Senhor um cântico novo."
          reference="Salmos 96:1"
          size="sm"
          align="center"
        />
      </div>
    </div>
  );
}
