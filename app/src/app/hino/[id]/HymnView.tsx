'use client';
import { useRouter } from 'next/navigation';
import { RevealStep } from '@/components/steps/RevealStep';
import type { AlignedWord } from '@/components/steps/RevealStep';

interface HymnData {
  title: string;
  lyrics: string;
  chords: string;
  verses: string[];
  themes: string[];
  audioUrl?: string;
  alignedWords?: AlignedWord[] | null;
}

interface HymnViewProps {
  hymn: HymnData;
  shareId: string;
  audioExpired: boolean;
}

export function HymnView({ hymn, shareId, audioExpired }: HymnViewProps) {
  const router = useRouter();

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--wash-dawn)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      padding: '32px var(--gutter) 32px',
    }}>
      <header style={{
        width: '100%', maxWidth: 'var(--container-lg)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 56,
      }}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}
          onClick={() => router.push('/')}
        >
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

      <div style={{ width: '100%', maxWidth: 'var(--container-md)' }}>
        <RevealStep
          hymn={hymn}
          onRestart={() => router.push('/')}
          shareId={shareId}
          audioExpired={audioExpired}
        />
      </div>

      <footer style={{ marginTop: 48, fontSize: 12, color: 'var(--text-faint)', textAlign: 'center' }}>
        <em>&quot;Cantai ao Senhor um cântico novo.&quot; — Salmos 96:1</em>
      </footer>
    </main>
  );
}
