import React from 'react';

/**
 * Hino.AI brand lockup: gold music-note roundel + Spectral wordmark.
 * @startingPoint section="Brand" subtitle="Logo mark + wordmark" viewport="360x96"
 */
export interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** 'light' for ivory backgrounds, 'sanctuary' for the dark theme. @default 'light' */
  variant?: 'light' | 'sanctuary';
  /** Mark height in px; wordmark scales from it. @default 40 */
  size?: number;
  /** Show the "Hino.AI" wordmark next to the mark. @default true */
  showWordmark?: boolean;
  style?: React.CSSProperties;
}

export function Logo(props: LogoProps): JSX.Element;
