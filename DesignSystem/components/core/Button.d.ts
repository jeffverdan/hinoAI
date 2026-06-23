import React from 'react';
import type { IconName } from './Icon';

/**
 * Primary action control — pill-shaped, warm gold by default.
 * @startingPoint section="Core" subtitle="Buttons — variants & sizes" viewport="520x220"
 */
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual style. @default 'primary' */
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold-soft' | 'danger';
  /** Control height. @default 'md' */
  size?: 'sm' | 'md' | 'lg';
  /** Stretch to container width. @default false */
  full?: boolean;
  /** Icon name shown before the label. */
  iconLeft?: IconName;
  /** Icon name shown after the label. */
  iconRight?: IconName;
  /** Render as another element (e.g. 'a'). @default 'button' */
  as?: 'button' | 'a';
  children?: React.ReactNode;
}

export function Button(props: ButtonProps): JSX.Element;
