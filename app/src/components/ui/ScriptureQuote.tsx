'use client';

const SIZES: Record<string, number> = { sm: 20, md: 28, lg: 40, xl: 56 };

interface ScriptureQuoteProps {
  verse: string;
  reference?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  align?: 'left' | 'center';
  className?: string;
  style?: React.CSSProperties;
}

export function ScriptureQuote({ verse, reference, size = 'md', align = 'left', className = '', style }: ScriptureQuoteProps) {
  const fs = SIZES[size] || SIZES.md;
  return (
    <figure
      className={['hino-scripture', align === 'center' ? 'hino-scripture--center' : '', className].filter(Boolean).join(' ')}
      style={{ margin: 0, ...style }}
    >
      <blockquote className="hino-scripture__verse" style={{ fontSize: fs }}>
        {`“${verse}”`}
      </blockquote>
      {reference && (
        <figcaption className="hino-scripture__ref" style={{ fontSize: Math.max(12, fs * 0.34) }}>
          — {reference}
        </figcaption>
      )}
    </figure>
  );
}
