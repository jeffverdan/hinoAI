'use client';

const ICONS: Record<string, string> = {
  music:       '<path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/>',
  play:        '<polygon points="6 3 20 12 6 21 6 3"/>',
  pause:       '<rect x="6" y="4" width="4" height="16" rx="1"/><rect x="14" y="4" width="4" height="16" rx="1"/>',
  mic:         '<path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="22"/><line x1="8" y1="22" x2="16" y2="22"/>',
  download:    '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>',
  share:       '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>',
  heart:       '<path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.49 4.04 3 5.5l7 7Z"/>',
  sparkles:    '<path d="M9.94 14.06A2 2 0 0 0 8.5 12.62l-5.14-1.32a.5.5 0 0 1 0-.97L8.5 9.01a2 2 0 0 0 1.44-1.44l1.32-5.14a.5.5 0 0 1 .97 0l1.32 5.14a2 2 0 0 0 1.44 1.44l5.14 1.32a.5.5 0 0 1 0 .97l-5.14 1.32a2 2 0 0 0-1.44 1.44l-1.32 5.14a.5.5 0 0 1-.97 0Z"/><path d="M20 3v4"/><path d="M22 5h-4"/>',
  book:        '<path d="M12 7v14"/><path d="M3 18a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h5a4 4 0 0 1 4 4 4 4 0 0 1 4-4h5a1 1 0 0 1 1 1v13a1 1 0 0 1-1 1h-6a3 3 0 0 0-3 3 3 3 0 0 0-3-3z"/>',
  check:       '<polyline points="20 6 9 17 4 12"/>',
  x:           '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',
  chevronRight:'<path d="m9 18 6-6-6-6"/>',
  chevronLeft: '<path d="m15 18-6-6 6-6"/>',
  arrowRight:  '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
  plus:        '<path d="M5 12h14"/><path d="M12 5v14"/>',
  user:        '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  church:      '<path d="M10 9h4"/><path d="M12 7v5"/><path d="M14 22v-4a2 2 0 0 0-4 0v4"/><path d="M18 22V5.6a2 2 0 0 0-1.1-1.8l-4-2.1a2 2 0 0 0-1.8 0l-4 2.1A2 2 0 0 0 6 5.6V22"/><path d="M4 22V11.5a2 2 0 0 1 1-1.7l1-.6"/><path d="M20 22V11.5a2 2 0 0 0-1-1.7l-1-.6"/>',
  wand:        '<path d="m15 4 5 5"/><path d="M3 21 17.6 6.4a2 2 0 0 0 0-2.8l-1.2-1.2a2 2 0 0 0-2.8 0L0 16"/>',
  wave:        '<path d="M2 10v3"/><path d="M6 6v11"/><path d="M10 3v18"/><path d="M14 8v7"/><path d="M18 5v13"/><path d="M22 10v3"/>',
  lock:        '<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>',
  mail:        '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>',
};

const SOLID = new Set(['play']);

interface IconProps {
  name?: string;
  size?: number;
  stroke?: number;
  color?: string;
  style?: React.CSSProperties;
  className?: string;
}

export function Icon({ name = 'music', size = 20, stroke = 2, color, style, className }: IconProps) {
  const inner = ICONS[name] || ICONS.music;
  const solid = SOLID.has(name);
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={solid ? 'currentColor' : 'none'}
      stroke={solid ? 'none' : 'currentColor'}
      strokeWidth={stroke}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
      style={{ color, display: 'inline-block', flex: 'none', verticalAlign: 'middle', ...style }}
      dangerouslySetInnerHTML={{ __html: inner }}
    />
  );
}
