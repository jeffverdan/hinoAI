import React from 'react';

const CSS = `
@keyframes hino-wave{0%,100%{transform:scaleY(.35)}50%{transform:scaleY(1)}}
.hino-wave{display:inline-flex;align-items:center;gap:3px;height:32px;}
.hino-wave__bar{width:3.5px;border-radius:var(--radius-pill);background:var(--accent);transform-origin:center;transform:scaleY(.4);}
.hino-wave--playing .hino-wave__bar{animation:hino-wave 900ms var(--ease-standard) infinite;}
@media (prefers-reduced-motion: reduce){.hino-wave--playing .hino-wave__bar{animation:none;}}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-wave-css')) {
  const s = document.createElement('style'); s.id = 'hino-wave-css'; s.textContent = CSS; document.head.appendChild(s);
}
// deterministic pseudo-random heights for a natural waveform
const H = [0.5, 0.8, 0.45, 1, 0.65, 0.9, 0.4, 0.75, 0.55, 0.95, 0.6, 0.85, 0.5, 0.7, 0.42, 0.88, 0.58, 0.78, 0.48, 0.92];

/** Audio waveform bars — animate while playing. */
export function WaveBars({ bars = 20, playing = false, height = 32, color, className = '', style = {}, ...rest }) {
  return (
    <span className={`hino-wave${playing ? ' hino-wave--playing' : ''} ${className}`.trim()} style={{ height, ...style }} {...rest}>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="hino-wave__bar"
          style={{
            height: '100%',
            transform: `scaleY(${H[i % H.length]})`,
            animationDelay: `${(i % H.length) * 70}ms`,
            background: color,
          }}
        />
      ))}
    </span>
  );
}
