import React from 'react';

export interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Selected state (gold fill). @default false */
  selected?: boolean;
  /** When false, renders as a static non-interactive chip. @default true */
  selectable?: boolean;
  children?: React.ReactNode;
}

/** Selectable chip — biblical themes, emotional tone, filters. */
export function Tag(props: TagProps): JSX.Element;
