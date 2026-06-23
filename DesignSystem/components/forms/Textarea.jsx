import React from 'react';

const CSS = `
.hino-ta-field{font-family:var(--font-sans);display:flex;flex-direction:column;gap:7px;}
.hino-ta-label{font-size:13px;font-weight:600;color:var(--text-heading);}
.hino-textarea{font-family:var(--font-sans);width:100%;box-sizing:border-box;padding:13px 15px;font-size:15px;line-height:1.55;color:var(--text-heading);
  background:var(--surface-card);border:1.5px solid var(--border);border-radius:var(--radius-md);outline:none;resize:vertical;min-height:120px;
  transition:border-color var(--dur-fast) var(--ease-standard),box-shadow var(--dur-fast) var(--ease-standard);}
.hino-textarea::placeholder{color:var(--text-faint);}
.hino-textarea:hover{border-color:var(--border-strong);}
.hino-textarea:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--focus-ring);}
.hino-ta-foot{display:flex;justify-content:space-between;font-size:12.5px;color:var(--text-muted);}
.hino-ta-count{font-family:var(--font-mono);font-size:11.5px;color:var(--text-faint);}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-textarea-css')) {
  const s = document.createElement('style'); s.id = 'hino-textarea-css'; s.textContent = CSS; document.head.appendChild(s);
}

/** Multi-line input — the testimony / story field. Optional character count. */
export function Textarea({ label, hint, value, maxLength, showCount = false, id, className = '', style = {}, ...rest }) {
  const fid = id || (label ? 'ta-' + label.replace(/\s+/g, '-').toLowerCase() : undefined);
  const len = typeof value === 'string' ? value.length : 0;
  return (
    <div className={`hino-ta-field ${className}`.trim()} style={style}>
      {label && <label className="hino-ta-label" htmlFor={fid}>{label}</label>}
      <textarea id={fid} className="hino-textarea" value={value} maxLength={maxLength} {...rest} />
      {(hint || showCount) && (
        <div className="hino-ta-foot">
          <span>{hint}</span>
          {showCount && <span className="hino-ta-count">{len}{maxLength ? ` / ${maxLength}` : ''}</span>}
        </div>
      )}
    </div>
  );
}
