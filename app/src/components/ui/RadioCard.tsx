'use client';
import { Icon } from './Icon';

interface RadioCardProps {
  icon?: string;
  title: string;
  description?: string;
  selected?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

export function RadioCard({ icon = 'music', title, description, selected = false, onClick, className = '', style }: RadioCardProps) {
  return (
    <button
      type="button"
      className={['hino-radiocard', className].filter(Boolean).join(' ')}
      aria-pressed={selected}
      onClick={onClick}
      style={style}
    >
      <span className="hino-radiocard__icon"><Icon name={icon} size={22} /></span>
      <span style={{ flex: 1, minWidth: 0, paddingRight: 22 }}>
        <span className="hino-radiocard__title">{title}</span>
        {description && <span className="hino-radiocard__desc">{description}</span>}
      </span>
      <span className="hino-radiocard__tick">
        <Icon name="check" size={13} stroke={3} />
      </span>
    </button>
  );
}
