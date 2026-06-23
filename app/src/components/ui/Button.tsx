'use client';
import { Icon } from './Icon';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'gold-soft' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  full?: boolean;
  iconLeft?: string;
  iconRight?: string;
  as?: 'button' | 'a';
  href?: string;
}

export function Button({
  variant = 'primary', size = 'md', full = false,
  iconLeft, iconRight, className = '', children, style, ...rest
}: ButtonProps) {
  const cls = [
    'hino-btn',
    `hino-btn--${size}`,
    `hino-btn--${variant}`,
    full ? 'hino-btn--full' : '',
    className,
  ].filter(Boolean).join(' ');

  const isize = size === 'lg' ? 20 : size === 'sm' ? 16 : 18;

  return (
    <button className={cls} style={style} {...rest}>
      {iconLeft  && <Icon name={iconLeft}  size={isize} />}
      {children}
      {iconRight && <Icon name={iconRight} size={isize} />}
    </button>
  );
}
