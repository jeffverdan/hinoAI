import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  /** Field label. */
  label?: string;
  /** Helper text shown at the bottom-left. */
  hint?: string;
  /** Show a character counter (pairs with maxLength). @default false */
  showCount?: boolean;
}

/** Multi-line input — the testimony / story field; optional character count. */
export function Textarea(props: TextareaProps): JSX.Element;
