import React from 'react';

export interface SwitchProps extends React.InputHTMLAttributes<HTMLInputElement> {
  /** Label text beside the toggle. */
  label?: string;
}

/** On/off toggle (gold when on) — settings like "Gerar vídeo para redes". */
export function Switch(props: SwitchProps): JSX.Element;
