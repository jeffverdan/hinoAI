import React from 'react';

export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text beside the box. */
  label?: string;
  /** Round (radio) styling instead of square checkbox. @default false */
  round?: boolean;
}

/** Checkbox or radio-style toggle with gold fill when checked. */
export function Checkbox(props: CheckboxProps): JSX.Element;
