import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import GlassCard from '../components/GlassCard';
import GlassPill from '../components/GlassPill';
import Lightbox from '../components/Lightbox';
import { getPosts } from '../api/posts';

/* ── Skeleton card ─────────────────────────────────── */
function SkeletonCard() {
  return (
    <div className="glass rounded-3xl overflow-hidden animate-pulse" aria-hidden="true">
      <div className="skeleton w-full" style={{ height: '220px' }} />
      <div className="p-4 space-y-2">
        <div className="skeleton h-3 rounded-full w-3/4" />
        <div className="skeleton h-3 rounded-full w-1/2" />
      </div>
    </div>
  );
}

/* ── Single feed card ──────────────────────────────── */
function FeedCard({ post, onOpen, index }) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(Math.floor(Math.random() * 40) + 1);

  const toggleLike = (e) => {
    e.stopPropagation();
    setLiked((p) => !p);
    setLikes((p) => (liked ? p - 1 : p + 1));
  };

  return (
    <GlassCard
      hover
      iridescent
      className="overflow-hidden cursor-pointer animate-fade-up"
      style={{ animationDelay: `${index * 60}ms` }}
      onClick={() => onOpen(post)}
      role="button"
      tabIndex={0}
      aria-label={`View post: ${post.caption || 'image'}`}
      onKeyDown={(e) => e.key === 'Enter' && onOpen(post)}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ paddingTop: '68%' }}>
        <img
          src={post.image}
          alt={post.caption || 'Post image'}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          style={{ transition: 'transform 0.5s ease' }}
          onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

        {/* Expand icon */}
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center"
          style={{ background: 'rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.5)' }}>
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" aria-hidden="true">
            <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/>
          </svg>
        </div>
      </div>

      {/* Body */}
      <div className="p-4">
        {post.caption ? (
          <p className="text-[#2d1f4a] text-sm leading-relaxed font-medium line-clamp-3">
            {post.caption}
          </p>
        ) : (
          <p className="text-[#9580b8] text-sm italic">No caption</p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-white/40">
          <span className="text-[10px] font-bold tracking-widest uppercase text-violet-400">
            NeonPost
          </span>
          <button
            onClick={toggleLike}
            className="flex items-center gap-1.5 text-xs font-medium transition-all duration-200"
            style={{ color: liked ? '#ec4899' : '#9580b8', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
            aria-label={liked ? 'Unlike' : 'Like'}
          >
            <svg
              width="14" height="14" viewBox="0 0 24 24"
              fill={liked ? '#ec4899' : 'none'}
              stroke={liked ? '#ec4899' : 'currentColor'}
              strokeWidth="2"
              style={{ filter: liked ? 'drop-shadow(0 0 4px #ec4899)' : 'none', transition: 'all 0.2s' }}
              aria-hidden="true"
            >
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/>
            </svg>
            {likes}
          </button>
        </div>
      </div>
    </GlassCard>
  );
}

/* ── Empty state ───────────────────────────────────── */
function EmptyState() {
  return (
    <div className="col-span-full flex flex-col items-center gap-5 py-24 text-center animate-fade-up">
      <div className="animate-float">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto"
          style={{
            background: 'linear-gradient(145deg, rgba(196,181,253,0.4), rgba(103,232,249,0.3))',
            border: '1px solid rgba(255,255,255,0.7)',
            boxShadow: '0 8px 24px rgba(139,92,246,0.15)',
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="url(#emptyG)" strokeWidth="1.5"/>
            <circle cx="8.5" cy="8.5" r="1.5" stroke="url(#emptyG)" strokeWidth="1.5"/>
            <polyline points="21 15 16 10 5 21" stroke="url(#emptyG)" strokeWidth="1.5"/>
            <defs>
              <linearGradient id="emptyG" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#8b5cf6"/>
                <stop offset="100%" stopColor="#06b6d4"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold text-[#2d1f4a]">No posts yet</h2>
        <p className="text-sm text-[#9580b8] mt-1">Be the first to share something amazing!</p>
      </div>
      <Link to="/">
        <GlassPill size="lg" id="empty-create-btn">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
            <path d="M12 5v14M5 12h14"/>
          </svg>
          Create First Post
        </GlassPill>
      </Link>
    </div>
  );
}

/* ── Error state ───────────────────────────────────── */
function ErrorState({ onRetry }) {
  return (
    <div className="col-span-full flex flex-col items-center gap-5 py-24 text-center animate-fade-up">
      <div className="animate-float">
        <div
          className="w-20 h-20 rounded-3xl flex items-center justify-center mx-auto"
          style={{
            background: 'rgba(254,205,211,0.5)',
            border: '1px solid rgba(252,165,165,0.6)',
          }}
        >
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#f43f5e" strokeWidth="1.5" aria-hidden="true">
            <circle cx="12" cy="12" r="10"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>
      </div>
      <div>
        <h2 className="text-xl font-bold text-[#2d1f4a]">Backend Offline</h2>
        <p className="text-sm text-[#9580b8] mt-1">
          Could not connect to <code className="font-mono bg-white/40 px-1.5 py-0.5 rounded-md text-xs">localhost:3000</code>
          <br/>Make sure the backend server is running.
        </p>
      </div>
      <GlassPill onClick={onRetry} size="lg" id="retry-btn">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
          <path d="M23 4v6h-6"/><path d="M1 20v-6h6"/><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
        </svg>
        Retry
      </GlassPill>
    </div>
  );
}

/* ── Feed Page ─────────────────────────────────────── */
export default function FeedPage() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selected, setSelected] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadPosts = useCallback(async () => {
    setError(false);
    try {
      const data = await getPosts();
      setPosts(data);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => { loadPosts(); }, [loadPosts]);

  const handleRefresh = () => {
    setRefreshing(true);
    loadPosts();
  };

  return (
    <main className="min-h-screen px-4 sm:px-6 pt-28 pb-16">
      <div className="max-w-6xl mx-auto">

        {/* ── Header ────────────────────────────── */}
        <div className="text-center mb-10 animate-fade-up">
          <p className="text-xs font-semibold tracking-widest uppercase text-violet-500 mb-2">
            ✦ Explore
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#1e0a3c] leading-tight">
            The{' '}
            <span
              style={{
                background: 'linear-gradient(135deg,#8b5cf6 0%,#06b6d4 50%,#ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Feed
            </span>
          </h1>
          <p className="mt-3 text-sm text-[#7c6a9a]">
            All posts from the community, live from the database.
          </p>
        </div>

        {/* ── Toolbar ──────────────────────────── */}
        {!loading && !error && (
          <div className="flex items-center justify-between mb-7 animate-fade-up" style={{ animationDelay: '60ms' }}>
            <div className="glass-sm flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium text-[#5c4a88]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 shrink-0" style={{ boxShadow: '0 0 6px #06b6d4' }} />
              {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
            </div>

            <GlassPill
              variant="glass"
              size="sm"
              loading={refreshing}
              onClick={handleRefresh}
              id="refresh-btn"
            >
              {!refreshing && (
                <svg
                  width="13" height="13" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5"
                  style={{ transition: 'transform 0.4s', transform: refreshing ? 'rotate(180deg)' : 'none' }}
                  aria-hidden="true"
                >
                  <path d="M23 4v6h-6"/><path d="M1 20v-6h6"/>
                  <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15"/>
                </svg>
              )}
              Refresh
            </GlassPill>
          </div>
        )}

        {/* ── Grid ─────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
            : error
              ? <ErrorState onRetry={handleRefresh} />
              : posts.length === 0
                ? <EmptyState />
                : posts.map((post, i) => (
                    <FeedCard
                      key={post._id}
                      post={post}
                      index={i}
                      onOpen={setSelected}
                    />
                  ))
          }
        </div>
      </div>

      {/* ── Lightbox ─────────────────────────────── */}
      <Lightbox post={selected} onClose={() => setSelected(null)} />
    </main>
  );
}
