import React from 'react';
import type { IconName } from '../core/Icon';

/**
 * Large selectable option card — hymn style, voice arrangement, plan tier.
 * @startingPoint section="Forms" subtitle="Selectable option cards" viewport="420x240"
 */
export interface RadioCardProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Leading icon. @default 'music' */
  icon?: IconName;
  /** Bold serif title. */
  title: string;
  /** Supporting description line. */
  description?: string;
  /** Selected state — gold ring, glow and tick. @default false */
  selected?: boolean;
}

export function RadioCard(props: RadioCardProps): JSX.Element;
