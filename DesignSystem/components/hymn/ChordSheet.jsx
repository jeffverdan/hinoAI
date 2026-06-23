import React from 'react';

const CSS = `
.hino-chordsheet{font-family:var(--font-mono);font-size:15px;line-height:1.25;color:var(--text-body);}
.hino-chordsheet__line{margin:0 0 14px;}
.hino-chordsheet__chords{color:var(--accent-ink);font-weight:700;white-space:pre;margin:0;}
.hino-chordsheet__lyric{color:var(--text-heading);white-space:pre;margin:0;}
.hino-chordsheet__section{font-family:var(--font-sans);font-size:11px;font-weight:700;letter-spacing:.14em;text-transform:uppercase;
  color:var(--accent-ink);margin:0 0 8px;}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-chordsheet-css')) {
  const s = document.createElement('style'); s.id = 'hino-chordsheet-css'; s.textContent = CSS; document.head.appendChild(s);
}

/** Cifra — fixed-width chord line aligned above its lyric line. */
export function ChordSheet({ lines = [], section, className = '', style = {}, ...rest }) {
  return (
    <div className={`hino-chordsheet ${className}`.trim()} style={style} {...rest}>
      {section && <p className="hino-chordsheet__section">{section}</p>}
      {lines.map((ln, i) => (
        <div className="hino-chordsheet__line" key={i}>
          {ln.chords != null && <p className="hino-chordsheet__chords">{ln.chords}</p>}
          <p className="hino-chordsheet__lyric">{ln.text}</p>
        </div>
      ))}
    </div>
  );
}
