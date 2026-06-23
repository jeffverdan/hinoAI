import React from 'react';
import type { IconName } from '../core/Icon';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Field label above the control. */
  label?: string;
  /** Leading icon name. */
  icon?: IconName;
  /** Helper text below the field. */
  hint?: string;
  /** Error message (turns the field red, overrides hint). */
  error?: string;
  /** Mark required with a gold asterisk. @default false */
  required?: boolean;
}

/** Single-line text field with label, optional icon, hint and error states. */
export function Input(props: InputProps): JSX.Element;
