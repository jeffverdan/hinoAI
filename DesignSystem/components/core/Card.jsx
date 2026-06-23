import React from 'react';

const CSS = `
.hino-card{font-family:var(--font-sans);background:var(--surface-card);border:1px solid var(--border);border-radius:var(--radius-card);
  box-shadow:var(--shadow-sm);color:var(--text-body);transition:box-shadow var(--dur-normal) var(--ease-standard),transform var(--dur-normal) var(--ease-standard),border-color var(--dur-normal) var(--ease-standard);}
.hino-card--pad{padding:var(--space-5);}
.hino-card--pad-lg{padding:var(--space-6);}
.hino-card--interactive{cursor:pointer;}
.hino-card--interactive:hover{box-shadow:var(--shadow-md);transform:translateY(-2px);border-color:var(--border-strong);}
.hino-card--selected{border-color:var(--border-gold);box-shadow:var(--glow-gold);}
.hino-card--raised{box-shadow:var(--shadow-lg);}
.hino-card--flat{box-shadow:none;}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-card-css')) {
  const s = document.createElement('style'); s.id = 'hino-card-css'; s.textContent = CSS; document.head.appendChild(s);
}

/** Surface container — white on ivory, warm soft shadow, gently rounded. */
export function Card({ pad = 'md', interactive = false, selected = false, elevation = 'sm', as = 'div', className = '', children, style = {}, ...rest }) {
  const Tag = as;
  const padCls = pad === 'lg' ? ' hino-card--pad-lg' : pad === 'none' ? '' : ' hino-card--pad';
  const elev = elevation === 'lg' ? ' hino-card--raised' : elevation === 'none' ? ' hino-card--flat' : '';
  const cls = `hino-card${padCls}${elev}${interactive ? ' hino-card--interactive' : ''}${selected ? ' hino-card--selected' : ''} ${className}`.trim();
  return <Tag className={cls} style={style} {...rest}>{children}</Tag>;
}
