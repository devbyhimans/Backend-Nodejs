import { useEffect, useCallback } from 'react';

/**
 * Full-screen lightbox modal.
 *
 * Props:
 *   post     — { image, caption } | null
 *   onClose  — function
 */
export default function Lightbox({ post, onClose }) {
  const handleKey = useCallback(
    (e) => { if (e.key === 'Escape') onClose(); },
    [onClose]
  );

  useEffect(() => {
    if (!post) return;
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [post, handleKey]);

  if (!post) return null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1a0a3a]/50 backdrop-blur-xl"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-3xl animate-scale-in iridescent rounded-4xl overflow-hidden">
        <div className="glass rounded-4xl overflow-hidden">
          {/* Image */}
          <div className="relative bg-black/5 max-h-[65vh] overflow-hidden flex items-center justify-center">
            <img
              src={post.image}
              alt={post.caption || 'Post image'}
              className="w-full h-full object-contain max-h-[65vh]"
            />
            {/* Subtle inner gradient */}
            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
          </div>

          {/* Caption + close */}
          <div className="px-7 py-5 flex items-start justify-between gap-4">
            <p className="text-[#2d1f4a] text-base leading-relaxed font-medium flex-1">
              {post.caption || (
                <span className="italic text-[#7c6a9a]">No caption</span>
              )}
            </p>
            <button
              onClick={onClose}
              className="pill-glass shrink-0 w-9 h-9 flex items-center justify-center rounded-full"
              aria-label="Close preview"
              id="lightbox-close"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
