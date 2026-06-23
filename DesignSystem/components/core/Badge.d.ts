import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Color tone. @default 'neutral' */
  tone?: 'neutral' | 'gold' | 'emotion' | 'success' | 'solid';
  /** Show a leading status dot. @default false */
  dot?: boolean;
  children?: React.ReactNode;
}

/** Small status / category label — plan tier, hymn theme, "Novo". */
export function Badge(props: BadgeProps): JSX.Element;
