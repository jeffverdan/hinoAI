import React from 'react';
import { Icon } from '../core/Icon.jsx';

const CSS = `
.hino-radiocard{font-family:var(--font-sans);position:relative;display:flex;align-items:flex-start;gap:14px;width:100%;text-align:left;cursor:pointer;
  background:var(--surface-card);border:1.5px solid var(--border);border-radius:var(--radius-lg);padding:18px;box-shadow:var(--shadow-xs);
  transition:border-color var(--dur-fast) var(--ease-standard),box-shadow var(--dur-fast) var(--ease-standard),transform var(--dur-fast) var(--ease-standard);}
.hino-radiocard:hover{border-color:var(--border-strong);box-shadow:var(--shadow-sm);}
.hino-radiocard:active{transform:scale(.99);}
.hino-radiocard:focus-visible{outline:none;box-shadow:0 0 0 3px var(--focus-ring);}
.hino-radiocard[aria-pressed="true"]{border-color:var(--border-gold);box-shadow:var(--glow-gold);}
.hino-radiocard__icon{width:44px;height:44px;flex:none;border-radius:var(--radius-md);display:flex;align-items:center;justify-content:center;
  background:var(--accent-soft);color:var(--accent-ink);}
.hino-radiocard[aria-pressed="true"] .hino-radiocard__icon{background:var(--accent);color:var(--text-on-gold);}
.hino-radiocard__title{font-family:var(--font-display);font-weight:600;font-size:18px;color:var(--text-heading);line-height:1.15;margin:0 0 3px;}
.hino-radiocard__desc{font-size:13.5px;color:var(--text-muted);line-height:1.45;margin:0;}
.hino-radiocard__tick{position:absolute;top:14px;right:14px;width:22px;height:22px;border-radius:50%;border:1.5px solid var(--border-strong);
  display:flex;align-items:center;justify-content:center;color:#fff;background:transparent;transition:all var(--dur-fast) var(--ease-standard);}
.hino-radiocard[aria-pressed="true"] .hino-radiocard__tick{background:var(--accent);border-color:var(--accent);}
.hino-radiocard__tick svg{opacity:0;transition:opacity var(--dur-fast);}
.hino-radiocard[aria-pressed="true"] .hino-radiocard__tick svg{opacity:1;}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-radiocard-css')) {
  const s = document.createElement('style'); s.id = 'hino-radiocard-css'; s.textContent = CSS; document.head.appendChild(s);
}

/** Large selectable option card — hymn style, voice, plan. Gold ring + tick when selected. */
export function RadioCard({ icon = 'music', title, description, selected = false, onClick, className = '', style = {}, ...rest }) {
  return (
    <button type="button" className={`hino-radiocard ${className}`.trim()} aria-pressed={selected} onClick={onClick} style={style} {...rest}>
      <span className="hino-radiocard__icon"><Icon name={icon} size={22} /></span>
      <span style={{ flex: 1, minWidth: 0, paddingRight: 22 }}>
        <span className="hino-radiocard__title">{title}</span>
        {description && <span className="hino-radiocard__desc">{description}</span>}
      </span>
      <span className="hino-radiocard__tick"><Icon name="check" size={13} stroke={3} /></span>
    </button>
  );
}
