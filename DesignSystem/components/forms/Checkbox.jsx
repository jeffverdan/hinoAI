import React from 'react';
import { Icon } from '../core/Icon.jsx';

const CSS = `
.hino-check{font-family:var(--font-sans);display:inline-flex;align-items:flex-start;gap:11px;cursor:pointer;user-select:none;color:var(--text-body);}
.hino-check input{position:absolute;opacity:0;width:0;height:0;}
.hino-check__box{width:21px;height:21px;flex:none;border-radius:6px;border:1.5px solid var(--border-strong);background:var(--surface-card);
  display:flex;align-items:center;justify-content:center;color:var(--text-on-gold);margin-top:1px;
  transition:background var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard);}
.hino-check__box svg{opacity:0;transform:scale(.6);transition:opacity var(--dur-fast),transform var(--dur-fast) var(--ease-out);}
.hino-check input:checked + .hino-check__box{background:var(--accent);border-color:var(--accent);}
.hino-check input:checked + .hino-check__box svg{opacity:1;transform:scale(1);}
.hino-check input:focus-visible + .hino-check__box{box-shadow:0 0 0 3px var(--focus-ring);}
.hino-check__txt{font-size:14.5px;line-height:1.45;}
.hino-check--round .hino-check__box{border-radius:50%;}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-check-css')) {
  const s = document.createElement('style'); s.id = 'hino-check-css'; s.textContent = CSS; document.head.appendChild(s);
}

/** Checkbox (square) or radio-style (round) with a label. */
export function Checkbox({ label, checked, round = false, className = '', style = {}, ...rest }) {
  return (
    <label className={`hino-check${round ? ' hino-check--round' : ''} ${className}`.trim()} style={style}>
      <input type={round ? 'radio' : 'checkbox'} checked={checked} {...rest} />
      <span className="hino-check__box"><Icon name="check" size={14} stroke={3} /></span>
      {label && <span className="hino-check__txt">{label}</span>}
    </label>
  );
}
