import React from 'react';

export interface StepDotsProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Total steps. @default 3 */
  total?: number;
  /** Current step (1-based). @default 1 */
  current?: number;
  /** Show the "Passo n de total" label. @default true */
  showLabel?: boolean;
}

/** Progress dots for the multi-step creation flow. */
export function StepDots(props: StepDotsProps): JSX.Element;
