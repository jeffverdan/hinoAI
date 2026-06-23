'use client';
import { Icon } from './Icon';

type IconButtonVariant = 'ghost' | 'outline' | 'solid';
type IconButtonSize = 'sm' | 'md' | 'lg';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  label: string;
}

const SIZES: Record<IconButtonSize, number> = { sm: 36, md: 44, lg: 56 };

export function IconButton({
  icon, variant = 'ghost', size = 'md', label, className = '', style, ...rest
}: IconButtonProps) {
  const px = SIZES[size];
  const isize = size === 'lg' ? 24 : size === 'sm' ? 18 : 20;
  const cls = ['hino-iconbtn', `hino-iconbtn--${variant}`, className].filter(Boolean).join(' ');

  return (
    <button
      type="button"
      className={cls}
      aria-label={label}
      title={label}
      style={{ width: px, height: px, ...style }}
      {...rest}
    >
      <Icon name={icon} size={isize} />
    </button>
  );
}
