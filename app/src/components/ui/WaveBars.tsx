'use client';

const H = [0.5, 0.8, 0.45, 1, 0.65, 0.9, 0.4, 0.75, 0.55, 0.95, 0.6, 0.85, 0.5, 0.7, 0.42, 0.88, 0.58, 0.78, 0.48, 0.92];

interface WaveBarsProps {
  bars?: number;
  playing?: boolean;
  height?: number;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function WaveBars({ bars = 20, playing = false, height = 32, color, className = '', style }: WaveBarsProps) {
  return (
    <span
      className={['hino-wave', playing ? 'hino-wave--playing' : '', className].filter(Boolean).join(' ')}
      style={{ height, ...style }}
    >
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="hino-wave__bar"
          style={{
            height: '100%',
            transform: `scaleY(${H[i % H.length]})`,
            animationDelay: `${(i % H.length) * 70}ms`,
            ...(color ? { background: color } : {}),
          }}
        />
      ))}
    </span>
  );
}
