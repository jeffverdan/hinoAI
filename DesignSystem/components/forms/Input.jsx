import React from 'react';
import { Icon } from '../core/Icon.jsx';

const CSS = `
.hino-field{font-family:var(--font-sans);display:flex;flex-direction:column;gap:7px;}
.hino-field__label{font-size:13px;font-weight:600;color:var(--text-heading);}
.hino-field__req{color:var(--emotion);margin-left:2px;}
.hino-field__wrap{position:relative;display:flex;align-items:center;}
.hino-field__icon{position:absolute;left:14px;color:var(--text-faint);pointer-events:none;display:flex;}
.hino-input{font-family:var(--font-sans);width:100%;box-sizing:border-box;height:var(--control-h-md);padding:0 14px;font-size:15px;color:var(--text-heading);
  background:var(--surface-card);border:1.5px solid var(--border);border-radius:var(--radius-md);outline:none;
  transition:border-color var(--dur-fast) var(--ease-standard),box-shadow var(--dur-fast) var(--ease-standard);}
.hino-input::placeholder{color:var(--text-faint);}
.hino-input:hover{border-color:var(--border-strong);}
.hino-input:focus{border-color:var(--accent);box-shadow:0 0 0 3px var(--focus-ring);}
.hino-input--icon{padding-left:42px;}
.hino-input--invalid{border-color:var(--danger);}
.hino-input--invalid:focus{box-shadow:0 0 0 3px var(--danger-soft);}
.hino-field__hint{font-size:12.5px;color:var(--text-muted);}
.hino-field__hint--err{color:var(--danger);}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-input-css')) {
  const s = document.createElement('style'); s.id = 'hino-input-css'; s.textContent = CSS; document.head.appendChild(s);
}

/** Single-line text field with optional label, leading icon, hint and error. */
export function Input({ label, icon, hint, error, required = false, id, className = '', style = {}, ...rest }) {
  const fid = id || (label ? 'in-' + label.replace(/\s+/g, '-').toLowerCase() : undefined);
  return (
    <div className={`hino-field ${className}`.trim()} style={style}>
      {label && <label className="hino-field__label" htmlFor={fid}>{label}{required && <span className="hino-field__req">*</span>}</label>}
      <div className="hino-field__wrap">
        {icon && <span className="hino-field__icon"><Icon name={icon} size={18} /></span>}
        <input id={fid} className={`hino-input${icon ? ' hino-input--icon' : ''}${error ? ' hino-input--invalid' : ''}`} aria-invalid={!!error} {...rest} />
      </div>
      {(error || hint) && <span className={`hino-field__hint${error ? ' hino-field__hint--err' : ''}`}>{error || hint}</span>}
    </div>
  );
}
