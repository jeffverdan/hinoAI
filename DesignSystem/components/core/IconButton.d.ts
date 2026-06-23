import React from 'react';
import type { IconName } from './Icon';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Icon name. */
  icon: IconName;
  /** Visual style. @default 'ghost' */
  variant?: 'ghost' | 'outline' | 'solid';
  /** Size (min touch target 44px at 'md'). @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Accessible label (also the tooltip). */
  label?: string;
}

/** Circular button holding a single icon — toolbars, players, dismiss. */
export function IconButton(props: IconButtonProps): JSX.Element;
