// Animated warm background with floating blobs + subtle grid
export default function BlobBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#ede8df] via-[#e8e0f0] to-[#dff0ee]" />

      {/* Blob 1 — violet */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-40 animate-blob-slow"
        style={{ background: 'radial-gradient(circle, #c4b5fd 0%, #8b5cf6 50%, transparent 70%)' }}
      />

      {/* Blob 2 — teal */}
      <div
        className="absolute top-1/2 -right-24 w-[480px] h-[480px] rounded-full opacity-35 animate-blob-mid"
        style={{ background: 'radial-gradient(circle, #67e8f9 0%, #06b6d4 50%, transparent 70%)' }}
      />

      {/* Blob 3 — pink */}
      <div
        className="absolute bottom-0 left-1/4 w-[400px] h-[400px] rounded-full opacity-30 animate-blob-fast"
        style={{ background: 'radial-gradient(circle, #f9a8d4 0%, #ec4899 50%, transparent 70%)' }}
      />

      {/* Blob 4 — amber */}
      <div
        className="absolute top-1/4 left-1/2 w-[320px] h-[320px] rounded-full opacity-25"
        style={{
          background: 'radial-gradient(circle, #fde68a 0%, #f59e0b 50%, transparent 70%)',
          animation: 'blob 18s ease-in-out infinite 6s',
        }}
      />

      {/* Noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '128px',
        }}
      />
    </div>
  );
}
