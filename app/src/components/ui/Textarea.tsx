'use client';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  hint?: string;
  showCount?: boolean;
}

export function Textarea({ label, hint, value, maxLength, showCount = false, id, className = '', style, ...rest }: TextareaProps) {
  const fid = id || (label ? 'ta-' + label.replace(/\s+/g, '-').toLowerCase() : undefined);
  const len = typeof value === 'string' ? value.length : 0;

  return (
    <div className={['hino-ta-field', className].filter(Boolean).join(' ')} style={style}>
      {label && <label className="hino-ta-label" htmlFor={fid}>{label}</label>}
      <textarea id={fid} className="hino-textarea" value={value} maxLength={maxLength} {...rest} />
      {(hint || showCount) && (
        <div className="hino-ta-foot">
          <span>{hint}</span>
          {showCount && <span className="hino-ta-count">{len}{maxLength ? ` / ${maxLength}` : ''}</span>}
        </div>
      )}
    </div>
  );
}
