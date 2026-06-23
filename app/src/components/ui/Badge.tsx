'use client';

type BadgeTone = 'neutral' | 'gold' | 'emotion' | 'success' | 'solid';

interface BadgeProps {
  tone?: BadgeTone;
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

export function Badge({ tone = 'neutral', dot = false, className = '', children, style }: BadgeProps) {
  const cls = [
    'hino-badge',
    `hino-badge--${tone}`,
    dot ? 'hino-badge--dot' : '',
    className,
  ].filter(Boolean).join(' ');
  return <span className={cls} style={style}>{children}</span>;
}
