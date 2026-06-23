'use client';

interface TagProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  selectable?: boolean;
}

export function Tag({ selected = false, selectable = true, onClick, className = '', children, style, ...rest }: TagProps) {
  return (
    <button
      type="button"
      className={['hino-tag', !selectable ? 'hino-tag--static' : '', className].filter(Boolean).join(' ')}
      aria-pressed={selectable ? selected : undefined}
      onClick={onClick}
      style={style}
      {...rest}
    >
      {children}
    </button>
  );
}
