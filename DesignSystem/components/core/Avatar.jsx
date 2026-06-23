import React from 'react';

const CSS = `
.hino-avatar{font-family:var(--font-sans);display:inline-flex;align-items:center;justify-content:center;flex:none;
  border-radius:50%;overflow:hidden;font-weight:600;color:var(--text-on-gold);background:var(--wash-gold);
  border:1.5px solid rgba(255,255,255,.6);box-shadow:var(--shadow-xs);}
.hino-avatar img{width:100%;height:100%;object-fit:cover;display:block;}
`;
if (typeof document !== 'undefined' && !document.getElementById('hino-avatar-css')) {
  const s = document.createElement('style'); s.id = 'hino-avatar-css'; s.textContent = CSS; document.head.appendChild(s);
}
const SIZES = { sm: 28, md: 40, lg: 56 };

function initials(name = '') {
  const p = name.trim().split(/\s+/);
  return ((p[0]?.[0] || '') + (p.length > 1 ? p[p.length - 1][0] : '')).toUpperCase();
}

/** User avatar — image or warm gold initials fallback. */
export function Avatar({ src, name = '', size = 'md', className = '', style = {}, ...rest }) {
  const px = typeof size === 'number' ? size : (SIZES[size] || SIZES.md);
  return (
    <span className={`hino-avatar ${className}`.trim()} style={{ width: px, height: px, fontSize: px * 0.4, ...style }} {...rest}>
      {src ? <img src={src} alt={name} /> : <span>{initials(name) || '\u266A'}</span>}
    </span>
  );
}
