import React from 'react';
import { Icon } from './Icon.jsx';

const CSS = `
.hino-btn{font-family:var(--font-sans);font-weight:600;border:1.5px solid transparent;border-radius:var(--radius-pill);
  display:inline-flex;align-items:center;justify-content:center;gap:.5em;cursor:pointer;text-decoration:none;white-space:nowrap;
  transition:transform var(--dur-fast) var(--ease-standard),background var(--dur-fast) var(--ease-standard),box-shadow var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard),color var(--dur-fast) var(--ease-standard);}
.hino-btn:focus-visible{outline:none;box-shadow:0 0 0 3px var(--focus-ring);}
.hino-btn:active{transform:scale(.98);}
.hino-btn[disabled]{cursor:not-allowed;opacity:.5;transform:none;box-shadow:none;}
.hino-btn--sm{height:var(--control-h-sm);padding:0 16px;font-size:14px;}
.hino-btn--md{height:var(--control-h-md);padding:0 22px;font-size:15px;}
.hino-btn--lg{height:var(--control-h-lg);padding:0 30px;font-size:17px;}
.hino-btn--full{width:100%;}
.hino-btn--primary{background:var(--accent);color:var(--text-on-gold);box-shadow:var(--shadow-sm);}
.hino-btn--primary:hover:not([disabled]){background:var(--accent-strong);box-shadow:var(--glow-soft);}
.hino-btn--secondary{background:transparent;color:var(--text-heading);border-color:var(--border-strong);}
.hino-btn--secondary:hover:not([disabled]){background:var(--bg-subtle);border-color:var(--accent);color:var(--accent-ink);}
.hino-btn--ghost{background:transparent;color:var(--text-body);}
.hino-btn--ghost:hover:not([disabled]){background:var(--bg-subtle);color:var(--text-heading);}
.hino-btn--gold-soft{background:var(--accent-soft);color:var(--accent-ink);}
.hino-btn--gold-soft:hover:not([disabled]){background:var(--gold-300);}
.hino-btn--danger{background:transparent;color:var(--danger);border-color:color-mix(in srgb,var(--danger) 40%,transparent);}
.hino-btn--danger:hover:not([disabled]){background:var(--danger-soft);}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-btn-css')) {
  const s = document.createElement('style'); s.id = 'hino-btn-css'; s.textContent = CSS; document.head.appendChild(s);
}

/** Primary action control. Pill-shaped, warm gold by default. */
export function Button({
  variant = 'primary', size = 'md', full = false, disabled = false,
  iconLeft, iconRight, as = 'button', className = '', children, style = {}, ...rest
}) {
  const Tag = as;
  const cls = `hino-btn hino-btn--${size} hino-btn--${variant}${full ? ' hino-btn--full' : ''} ${className}`.trim();
  const isize = size === 'lg' ? 20 : size === 'sm' ? 16 : 18;
  return (
    <Tag className={cls} disabled={Tag === 'button' ? disabled : undefined} style={style} {...rest}>
      {iconLeft && <Icon name={iconLeft} size={isize} />}
      {children}
      {iconRight && <Icon name={iconRight} size={isize} />}
    </Tag>
  );
}
