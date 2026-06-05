import { useState, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import GlassPill from '../components/GlassPill';
import { createPost } from '../api/posts';

export default function PostPage() {
  const [image, setImage] = useState(null);       // File object
  const [preview, setPreview] = useState(null);   // Object URL
  const [caption, setCaption] = useState('');
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState(null);     // { type: 'success'|'error', msg }
  const [loading, setLoading] = useState(false);
  const fileRef = useRef(null);
  const navigate = useNavigate();

  const applyFile = (file) => {
    if (!file || !file.type.startsWith('image/')) return;
    setImage(file);
    setPreview(URL.createObjectURL(file));
    setStatus(null);
  };

  /* ── Drag & Drop ─────────────────────────────── */
  const onDrop = useCallback((e) => {
    e.preventDefault();
    setDragging(false);
    applyFile(e.dataTransfer.files[0]);
  }, []);

  const onDragOver = (e) => { e.preventDefault(); setDragging(true); };
  const onDragLeave = () => setDragging(false);

  /* ── Submit ──────────────────────────────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) { setStatus({ type: 'error', msg: 'Please select an image first.' }); return; }
    setLoading(true);
    setStatus(null);
    try {
      await createPost(image, caption);
      setStatus({ type: 'success', msg: '🎉 Post published successfully!' });
      setImage(null);
      setPreview(null);
      setCaption('');
      setTimeout(() => navigate('/feed'), 1600);
    } catch (err) {
      setStatus({ type: 'error', msg: err.message || 'Something went wrong.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 pt-28 pb-16 gap-8">

      {/* ── Page header ─────────────────────────── */}
      <div className="text-center animate-fade-up" style={{ animationDelay: '0ms' }}>
        <p className="text-xs font-semibold tracking-widest uppercase text-violet-500 mb-2">
          ✦ Share Your World
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1e0a3c] leading-tight">
          Create a{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #8b5cf6 0%, #06b6d4 50%, #ec4899 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Post
          </span>
        </h1>
        <p className="mt-3 text-sm text-[#7c6a9a]">
          Upload an image, add a caption, and publish it to the feed.
        </p>
      </div>

      {/* ── Main Card ───────────────────────────── */}
      <GlassCard
        iridescent
        className="w-full max-w-lg p-7 animate-fade-up"
        style={{ animationDelay: '80ms' }}
      >
        <form onSubmit={handleSubmit} noValidate>

          {/* ── Upload zone ─────────────────────── */}
          <div
            className={`drop-zone rounded-2xl mb-6 relative overflow-hidden cursor-pointer transition-all
              ${dragging ? 'drag-over' : ''}`}
            style={{ minHeight: '220px' }}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={() => !preview && fileRef.current?.click()}
            role="button"
            tabIndex={0}
            aria-label="Upload image"
            onKeyDown={(e) => e.key === 'Enter' && !preview && fileRef.current?.click()}
            id="upload-zone"
          >
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              name="image"
              className="hidden"
              id="image-input"
              onChange={(e) => applyFile(e.target.files[0])}
            />

            {preview ? (
              /* Preview */
              <div className="relative w-full h-full" style={{ minHeight: '220px' }}>
                <img
                  src={preview}
                  alt="Selected"
                  className="w-full object-cover rounded-2xl"
                  style={{ maxHeight: '360px' }}
                />
                {/* Change overlay */}
                <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all flex items-center justify-center group rounded-2xl">
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
                    className="pill-glass opacity-0 group-hover:opacity-100 transition-all px-4 py-2 text-sm font-medium flex items-center gap-2"
                    id="change-image-btn"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                      <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                      <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                    </svg>
                    Change Image
                  </button>
                </div>
              </div>
            ) : (
              /* Placeholder */
              <div className="flex flex-col items-center justify-center gap-3 py-12 px-6 text-center">
                {/* 3D upload icon */}
                <div className="relative w-16 h-16 animate-float">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(145deg, rgba(196,181,253,0.6), rgba(139,92,246,0.25))',
                      border: '1px solid rgba(196,181,253,0.7)',
                      boxShadow: '0 8px 20px rgba(139,92,246,0.2), 0 1px 2px rgba(255,255,255,0.8) inset',
                    }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="url(#upGrad)" strokeWidth="2" strokeLinecap="round"/>
                      <polyline points="17 8 12 3 7 8" stroke="url(#upGrad)" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="12" y1="3" x2="12" y2="15" stroke="url(#upGrad)" strokeWidth="2" strokeLinecap="round"/>
                      <defs>
                        <linearGradient id="upGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#8b5cf6"/>
                          <stop offset="100%" stopColor="#06b6d4"/>
                        </linearGradient>
                      </defs>
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-[#3b2d6a] font-semibold text-sm">
                    Drop your image here
                  </p>
                  <p className="text-[#9580b8] text-xs mt-1">
                    or{' '}
                    <span
                      className="text-violet-600 underline underline-offset-2 cursor-pointer hover:text-violet-800"
                      onClick={(e) => { e.stopPropagation(); fileRef.current?.click(); }}
                    >
                      browse files
                    </span>
                  </p>
                </div>
                <p className="text-[#b5a8cc] text-[11px]">PNG · JPG · GIF · WEBP — up to 10 MB</p>
              </div>
            )}
          </div>

          {/* ── Caption input ────────────────────── */}
          <div className="mb-6">
            <label
              htmlFor="caption-input"
              className="block text-[11px] font-bold tracking-widest uppercase text-[#9580b8] mb-2"
            >
              Caption
            </label>
            <div className="relative">
              <textarea
                id="caption-input"
                name="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value.slice(0, 280))}
                placeholder="Write something beautiful..."
                rows={3}
                maxLength={280}
                className="glass-input w-full resize-none px-4 py-3 text-sm leading-relaxed"
              />
              <span className="absolute bottom-2.5 right-3 text-[11px] text-[#b5a8cc]">
                {caption.length}/280
              </span>
            </div>
          </div>

          {/* ── Status message ───────────────────── */}
          {status && (
            <div
              className={`mb-5 px-4 py-3 rounded-2xl text-sm font-medium text-center
                ${status.type === 'success'
                  ? 'bg-emerald-100/60 border border-emerald-300/60 text-emerald-700'
                  : 'bg-rose-100/60 border border-rose-300/60 text-rose-700'
                }`}
              role="alert"
            >
              {status.msg}
            </div>
          )}

          {/* ── Actions ──────────────────────────── */}
          <div className="flex items-center gap-3">
            <GlassPill
              type="submit"
              size="lg"
              loading={loading}
              className="flex-1"
              id="publish-btn"
            >
              {!loading && (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                  <path d="M22 2L11 13"/><path d="M22 2L15 22 11 13 2 9l20-7z"/>
                </svg>
              )}
              {loading ? 'Uploading…' : 'Publish Post'}
            </GlassPill>

            {preview && (
              <GlassPill
                variant="glass"
                size="lg"
                onClick={() => { setImage(null); setPreview(null); setStatus(null); }}
                id="clear-btn"
              >
                Clear
              </GlassPill>
            )}
          </div>
        </form>
      </GlassCard>

      {/* ── Tech badges ─────────────────────────── */}
      <div
        className="flex items-center gap-2 flex-wrap justify-center animate-fade-up"
        style={{ animationDelay: '160ms' }}
      >
        {[
          { dot: '#06b6d4', label: 'Express API' },
          { dot: '#8b5cf6', label: 'MongoDB Atlas' },
          { dot: '#ec4899', label: 'ImageKit CDN' },
        ].map(({ dot, label }) => (
          <span
            key={label}
            className="glass-sm flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs text-[#5c4a88] font-medium"
          >
            <span
              className="w-2 h-2 rounded-full shrink-0"
              style={{ background: dot, boxShadow: `0 0 6px ${dot}` }}
            />
            {label}
          </span>
        ))}
      </div>
    </main>
  );
}
