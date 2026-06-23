import React from 'react';

export type IconName =
  | 'music' | 'play' | 'pause' | 'mic' | 'download' | 'share' | 'heart'
  | 'sparkles' | 'book' | 'check' | 'x' | 'chevronRight' | 'chevronLeft'
  | 'arrowRight' | 'plus' | 'wave' | 'user' | 'lock' | 'mail' | 'church' | 'wand';

export interface IconProps extends React.SVGAttributes<SVGSVGElement> {
  /** Icon name from the curated Lucide subset. @default 'music' */
  name?: IconName;
  /** Pixel size (width & height). @default 20 */
  size?: number;
  /** Stroke width for outline icons. @default 2 */
  stroke?: number;
  /** Overrides currentColor. */
  color?: string;
  style?: React.CSSProperties;
}

/** Inline SVG icon from the Hino.AI (Lucide-based) set; inherits currentColor. */
export function Icon(props: IconProps): JSX.Element;
