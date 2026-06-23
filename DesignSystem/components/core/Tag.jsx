import React from 'react';

const CSS = `
.hino-tag{font-family:var(--font-sans);font-weight:500;display:inline-flex;align-items:center;gap:7px;border-radius:var(--radius-pill);
  font-size:13.5px;line-height:1;padding:8px 14px;cursor:pointer;user-select:none;
  background:var(--surface-card);color:var(--text-body);border:1.5px solid var(--border);
  transition:background var(--dur-fast) var(--ease-standard),border-color var(--dur-fast) var(--ease-standard),color var(--dur-fast) var(--ease-standard);}
.hino-tag:hover{border-color:var(--accent);color:var(--accent-ink);}
.hino-tag[aria-pressed="true"]{background:var(--accent-soft);border-color:var(--border-gold);color:var(--accent-ink);font-weight:600;}
.hino-tag:focus-visible{outline:none;box-shadow:0 0 0 3px var(--focus-ring);}
.hino-tag--static{cursor:default;}
.hino-tag--static:hover{border-color:var(--border);color:var(--text-body);}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-tag-css')) {
  const s = document.createElement('style'); s.id = 'hino-tag-css'; s.textContent = CSS; document.head.appendChild(s);
}

/** Selectable chip — themes, moods, filters. Becomes static (non-interactive) when `selectable={false}`. */
export function Tag({ selected = false, selectable = true, onClick, className = '', children, style = {}, ...rest }) {
  return (
    <button
      type="button"
      className={`hino-tag${selectable ? '' : ' hino-tag--static'} ${className}`.trim()}
      aria-pressed={selectable ? selected : undefined}
      onClick={onClick}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
}
