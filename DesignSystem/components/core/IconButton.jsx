import React from 'react';
import { Icon } from './Icon.jsx';

const CSS = `
.hino-iconbtn{font-family:var(--font-sans);border:1.5px solid transparent;cursor:pointer;display:inline-flex;align-items:center;justify-content:center;
  border-radius:var(--radius-pill);color:var(--text-body);background:transparent;flex:none;
  transition:transform var(--dur-fast) var(--ease-standard),background var(--dur-fast) var(--ease-standard),box-shadow var(--dur-fast) var(--ease-standard),color var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard);}
.hino-iconbtn:focus-visible{outline:none;box-shadow:0 0 0 3px var(--focus-ring);}
.hino-iconbtn:active{transform:scale(.94);}
.hino-iconbtn[disabled]{cursor:not-allowed;opacity:.45;}
.hino-iconbtn--ghost:hover:not([disabled]){background:var(--bg-subtle);color:var(--text-heading);}
.hino-iconbtn--outline{border-color:var(--border-strong);}
.hino-iconbtn--outline:hover:not([disabled]){border-color:var(--accent);color:var(--accent-ink);background:var(--bg-subtle);}
.hino-iconbtn--solid{background:var(--accent);color:var(--text-on-gold);box-shadow:var(--shadow-sm);}
.hino-iconbtn--solid:hover:not([disabled]){background:var(--accent-strong);box-shadow:var(--glow-soft);}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-iconbtn-css')) {
  const s = document.createElement('style'); s.id = 'hino-iconbtn-css'; s.textContent = CSS; document.head.appendChild(s);
}
const SIZES = { sm: 36, md: 44, lg: 56 };

/** Square-ish circular button containing a single icon. */
export function IconButton({ icon, variant = 'ghost', size = 'md', label, disabled = false, className = '', style = {}, ...rest }) {
  const px = SIZES[size] || SIZES.md;
  const isize = size === 'lg' ? 24 : size === 'sm' ? 18 : 20;
  return (
    <button
      type="button"
      className={`hino-iconbtn hino-iconbtn--${variant} ${className}`.trim()}
      aria-label={label}
      title={label}
      disabled={disabled}
      style={{ width: px, height: px, ...style }}
      {...rest}
    >
      <Icon name={icon} size={isize} />
    </button>
  );
}
