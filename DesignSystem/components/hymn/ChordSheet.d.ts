import React from 'react';

export interface ChordLine {
  /** Chord row (monospace-aligned over the lyric). Omit for chord-less lines. */
  chords?: string;
  /** Lyric text. */
  text: string;
}

export interface ChordSheetProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Lines of cifra — each a chord row over a lyric row. */
  lines: ChordLine[];
  /** Optional section label, e.g. "Refrão". */
  section?: string;
}

/** Cifra block — fixed-width (JetBrains Mono) chords aligned above lyrics. */
export function ChordSheet(props: ChordSheetProps): JSX.Element;
