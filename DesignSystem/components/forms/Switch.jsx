import React from 'react';

const CSS = `
.hino-switch{font-family:var(--font-sans);display:inline-flex;align-items:center;gap:11px;cursor:pointer;user-select:none;color:var(--text-body);}
.hino-switch input{position:absolute;opacity:0;width:0;height:0;}
.hino-switch__track{width:44px;height:26px;flex:none;border-radius:var(--radius-pill);background:var(--ink-300);position:relative;
  transition:background var(--dur-normal) var(--ease-standard);}
.hino-switch__thumb{position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:#fff;box-shadow:var(--shadow-sm);
  transition:transform var(--dur-normal) var(--ease-out);}
.hino-switch input:checked + .hino-switch__track{background:var(--accent);}
.hino-switch input:checked + .hino-switch__track .hino-switch__thumb{transform:translateX(18px);}
.hino-switch input:focus-visible + .hino-switch__track{box-shadow:0 0 0 3px var(--focus-ring);}
.hino-switch__txt{font-size:14.5px;}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-switch-css')) {
  const s = document.createElement('style'); s.id = 'hino-switch-css'; s.textContent = CSS; document.head.appendChild(s);
}

/** On/off toggle with a label. */
export function Switch({ label, checked, className = '', style = {}, ...rest }) {
  return (
    <label className={`hino-switch ${className}`.trim()} style={style}>
      <input type="checkbox" role="switch" checked={checked} {...rest} />
      <span className="hino-switch__track"><span className="hino-switch__thumb" /></span>
      {label && <span className="hino-switch__txt">{label}</span>}
    </label>
  );
}
