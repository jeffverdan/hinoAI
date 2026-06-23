import React from 'react';

const CSS = `
.hino-scripture{font-family:var(--font-serif);position:relative;}
.hino-scripture__halo{position:absolute;left:50%;top:-30%;width:140%;height:160%;transform:translateX(-50%);background:var(--wash-halo);pointer-events:none;}
.hino-scripture__verse{font-style:italic;font-weight:500;line-height:1.32;margin:0 0 .5em;color:var(--text-heading);position:relative;}
.hino-scripture__ref{font-family:var(--font-sans);font-weight:600;letter-spacing:.04em;color:var(--accent-ink);position:relative;}
.hino-scripture--center{text-align:center;}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-scripture-css')) {
  const s = document.createElement('style'); s.id = 'hino-scripture-css'; s.textContent = CSS; document.head.appendChild(s);
}
const SIZES = { sm: 20, md: 28, lg: 40, xl: 56 };

/** The signature scripture treatment — italic Spectral verse + reference, optional golden halo. */
export function ScriptureQuote({ verse, reference, size = 'md', align = 'left', halo = false, className = '', style = {}, ...rest }) {
  const fs = SIZES[size] || SIZES.md;
  return (
    <figure className={`hino-scripture${align === 'center' ? ' hino-scripture--center' : ''} ${className}`.trim()} style={{ margin: 0, ...style }} {...rest}>
      {halo && <span className="hino-scripture__halo" />}
      <blockquote className="hino-scripture__verse" style={{ fontSize: fs }}>
        {`\u201C${verse}\u201D`}
      </blockquote>
      {reference && <figcaption className="hino-scripture__ref" style={{ fontSize: Math.max(12, fs * 0.34) }}>— {reference}</figcaption>}
    </figure>
  );
}
