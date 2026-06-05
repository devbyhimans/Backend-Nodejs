/**
 * Reusable liquid glass card wrapper.
 *
 * Props:
 *   className  — extra Tailwind classes
 *   iridescent — add rainbow border glow
 *   hover      — add lift-on-hover effect
 *   children
 */
export default function GlassCard({ children, className = '', iridescent = false, hover = false }) {
  return (
    <div
      className={[
        'glass rounded-3xl',
        iridescent ? 'iridescent' : '',
        hover ? 'card-lift' : '',
        className,
      ].join(' ')}
    >
      {children}
    </div>
  );
}
