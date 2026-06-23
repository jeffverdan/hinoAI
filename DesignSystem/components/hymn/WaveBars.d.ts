import React from 'react';

export interface WaveBarsProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Number of bars. @default 20 */
  bars?: number;
  /** Animate (when audio is playing). @default false */
  playing?: boolean;
  /** Pixel height. @default 32 */
  height?: number;
  /** Bar color (defaults to --accent). */
  color?: string;
}

/** Audio waveform bars for the player — gentle scaleY animation while playing. */
export function WaveBars(props: WaveBarsProps): JSX.Element;
