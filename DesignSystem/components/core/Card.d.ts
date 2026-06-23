import React from 'react';

/**
 * Surface container — white on ivory, warm soft shadow, gently rounded.
 * @startingPoint section="Core" subtitle="Card surfaces & states" viewport="520x240"
 */
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  /** Inner padding. @default 'md' */
  pad?: 'none' | 'md' | 'lg';
  /** Lift + pointer on hover. @default false */
  interactive?: boolean;
  /** Gold ring + glow for selected state. @default false */
  selected?: boolean;
  /** Resting elevation. @default 'sm' */
  elevation?: 'none' | 'sm' | 'lg';
  /** Element tag. @default 'div' */
  as?: keyof JSX.IntrinsicElements;
  children?: React.ReactNode;
}

export function Card(props: CardProps): JSX.Element;
