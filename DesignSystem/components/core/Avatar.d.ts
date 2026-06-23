import React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Image URL; falls back to initials when absent. */
  src?: string;
  /** Full name — drives initials and alt text. */
  name?: string;
  /** Preset size or pixel number. @default 'md' */
  size?: 'sm' | 'md' | 'lg' | number;
}

/** User avatar — photo or warm gold initials fallback (♪ if empty). */
export function Avatar(props: AvatarProps): JSX.Element;
