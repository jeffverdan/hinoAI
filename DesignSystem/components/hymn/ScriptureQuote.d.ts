import React from 'react';

/**
 * Hino.AI's signature scripture treatment — italic Spectral verse + reference.
 * @startingPoint section="Brand" subtitle="Scripture verse block" viewport="640x220"
 */
export interface ScriptureQuoteProps extends React.HTMLAttributes<HTMLElement> {
  /** Verse text (quotes added automatically). */
  verse: string;
  /** Reference, e.g. "Salmos 96:1". */
  reference?: string;
  /** Verse size. @default 'md' */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Text alignment. @default 'left' */
  align?: 'left' | 'center';
  /** Render a soft golden halo behind the verse. @default false */
  halo?: boolean;
}

export function ScriptureQuote(props: ScriptureQuoteProps): JSX.Element;
