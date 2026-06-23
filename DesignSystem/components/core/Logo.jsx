import React from 'react';

/**
 * Hino.AI logo — gold roundel with a music-note mark + "Hino.AI" wordmark.
 * variant 'light' for ivory backgrounds, 'sanctuary' for the dark theme.
 */
export function Logo({ variant = 'light', size = 40, showWordmark = true, style = {}, ...rest }) {
  const sanctuary = variant === 'sanctuary';
  const noteColor = sanctuary ? '#e6cf96' : '#11192b';
  const wordColor = sanctuary ? '#fdfaf3' : '#1a2438';
  const aiColor = sanctuary ? '#d9b86a' : '#c9a14a';

  const mark = (
    <svg width={size} height={size} viewBox="0 0 72 72" fill="none" style={{ flex: 'none', display: 'block' }} aria-hidden="true">
      {sanctuary ? (
        <circle cx="36" cy="36" r="34" fill="none" stroke="#c9a14a" strokeWidth="1.5" />
      ) : (
        <>
          <defs>
            <linearGradient id="hinoGoldLogo" x1="10" y1="6" x2="62" y2="66" gradientUnits="userSpaceOnUse">
              <stop stopColor="#d9b86a" />
              <stop offset="1" stopColor="#b8893a" />
            </linearGradient>
          </defs>
          <circle cx="36" cy="36" r="34" fill="url(#hinoGoldLogo)" />
          <circle cx="36" cy="36" r="33" fill="none" stroke="#9c7330" strokeOpacity="0.45" />
        </>
      )}
      <g transform="translate(13.5,12) scale(1.62)" stroke={noteColor} strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18V5l12-2v13" fill="none" />
        <circle cx="6" cy="18" r="3" fill={noteColor} />
        <circle cx="18" cy="16" r="3" fill={noteColor} />
      </g>
    </svg>
  );

  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.34, ...style }} {...rest}>
      {mark}
      {showWordmark && (
        <span style={{
          fontFamily: 'var(--font-display)', fontWeight: 600,
          fontSize: size * 0.86, letterSpacing: '-0.02em', lineHeight: 1, color: wordColor,
        }}>
          Hino<span style={{ color: aiColor }}>.AI</span>
        </span>
      )}
    </span>
  );
}
