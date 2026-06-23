import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HinoAI — Seu hino, sua história',
  description:
    'Transforme seu testemunho de fé em um hino adventista personalizado com letra, cifra e áudio gerados por IA.',
  keywords: ['hino adventista', 'hino personalizado', 'IA', 'testemunho', 'fé'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ minHeight: '100vh', background: 'var(--bg-page)' }}>
        {children}
      </body>
    </html>
  );
}
