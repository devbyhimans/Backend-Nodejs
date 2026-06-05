/**
 * Pill button — two visual variants.
 *
 * Props:
 *   variant   — 'violet' | 'glass'  (default: 'violet')
 *   size      — 'sm' | 'md' | 'lg'  (default: 'md')
 *   disabled
 *   loading   — shows spinner
 *   onClick
 *   type      — button | submit
 *   className
 *   children
 */
export default function GlassPill({
  children,
  variant = 'violet',
  size = 'md',
  disabled = false,
  loading = false,
  onClick,
  type = 'button',
  className = '',
}) {
  const sizes = {
    sm: 'px-4 py-1.5 text-sm',
    md: 'px-6 py-2.5 text-sm',
    lg: 'px-8 py-3 text-base',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={[
        variant === 'violet' ? 'pill-violet' : 'pill-glass',
        sizes[size],
        'flex items-center justify-center gap-2 select-none',
        (disabled || loading) ? 'opacity-60 pointer-events-none' : '',
        className,
      ].join(' ')}
    >
      {loading && (
        <svg
          className="animate-spin w-4 h-4 shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
        </svg>
      )}
      {children}
    </button>
  );
}
