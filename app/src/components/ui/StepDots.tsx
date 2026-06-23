'use client';

interface StepDotsProps {
  total?: number;
  current?: number;
  showLabel?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function StepDots({ total = 3, current = 1, showLabel = true, className = '', style }: StepDotsProps) {
  const items: React.ReactNode[] = [];
  for (let i = 1; i <= total; i++) {
    const state = i < current ? 'done' : i === current ? 'current' : '';
    items.push(
      <span key={'d' + i} className={['hino-steps__dot', state ? `hino-steps__dot--${state}` : ''].filter(Boolean).join(' ')} />
    );
    if (i < total) {
      items.push(
        <span key={'s' + i} className={['hino-steps__seg', i < current ? 'hino-steps__seg--done' : ''].filter(Boolean).join(' ')} />
      );
    }
  }
  return (
    <div
      className={['hino-steps', className].filter(Boolean).join(' ')}
      style={style}
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={1}
      aria-valuemax={total}
    >
      {items}
      {showLabel && <span className="hino-steps__label">Passo {current} de {total}</span>}
    </div>
  );
}
