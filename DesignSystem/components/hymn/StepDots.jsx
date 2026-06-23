import React from 'react';

const CSS = `
.hino-steps{font-family:var(--font-sans);display:flex;align-items:center;gap:0;}
.hino-steps__dot{width:11px;height:11px;border-radius:50%;background:var(--ink-200);flex:none;
  transition:background var(--dur-normal) var(--ease-standard),transform var(--dur-normal) var(--ease-standard);}
.hino-steps__dot--done{background:var(--accent);}
.hino-steps__dot--current{background:var(--accent);transform:scale(1.35);box-shadow:0 0 0 4px var(--accent-soft);}
.hino-steps__seg{width:34px;height:2px;background:var(--ink-200);flex:none;}
.hino-steps__seg--done{background:var(--accent);}
.hino-steps__label{font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--text-faint);margin-left:14px;}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-steps-css')) {
  const s = document.createElement('style'); s.id = 'hino-steps-css'; s.textContent = CSS; document.head.appendChild(s);
}

/** Progress dots for the creation flow — "PASSO n DE total". */
export function StepDots({ total = 3, current = 1, showLabel = true, className = '', style = {}, ...rest }) {
  const items = [];
  for (let i = 1; i <= total; i++) {
    const state = i < current ? 'done' : i === current ? 'current' : '';
    items.push(<span key={'d' + i} className={`hino-steps__dot${state ? ' hino-steps__dot--' + state : ''}`} />);
    if (i < total) items.push(<span key={'s' + i} className={`hino-steps__seg${i < current ? ' hino-steps__seg--done' : ''}`} />);
  }
  return (
    <div className={`hino-steps ${className}`.trim()} style={style} role="progressbar" aria-valuenow={current} aria-valuemin={1} aria-valuemax={total} {...rest}>
      {items}
      {showLabel && <span className="hino-steps__label">Passo {current} de {total}</span>}
    </div>
  );
}
