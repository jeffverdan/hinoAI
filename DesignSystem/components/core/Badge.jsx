import React from 'react';

const CSS = `
.hino-badge{font-family:var(--font-sans);font-weight:600;display:inline-flex;align-items:center;gap:5px;border-radius:var(--radius-pill);
  font-size:11.5px;letter-spacing:.02em;line-height:1;padding:5px 10px;border:1px solid transparent;white-space:nowrap;}
.hino-badge--neutral{background:var(--bg-sunken);color:var(--text-muted);border-color:var(--border);}
.hino-badge--gold{background:var(--accent-soft);color:var(--accent-ink);border-color:var(--border-gold);}
.hino-badge--emotion{background:var(--emotion-soft);color:var(--emotion-strong);}
.hino-badge--success{background:var(--success-soft);color:var(--success);}
.hino-badge--solid{background:var(--accent);color:var(--text-on-gold);}
.hino-badge--dot::before{content:"";width:6px;height:6px;border-radius:50%;background:currentColor;}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-badge-css')) {
  const s = document.createElement('style'); s.id = 'hino-badge-css'; s.textContent = CSS; document.head.appendChild(s);
}

/** Small status / category label. */
export function Badge({ tone = 'neutral', dot = false, className = '', children, style = {}, ...rest }) {
  return (
    <span className={`hino-badge hino-badge--${tone}${dot ? ' hino-badge--dot' : ''} ${className}`.trim()} style={style} {...rest}>
      {children}
    </span>
  );
}
