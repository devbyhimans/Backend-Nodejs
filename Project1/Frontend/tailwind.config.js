/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      colors: {
        glass: {
          white: 'rgba(255,255,255,0.55)',
          border: 'rgba(255,255,255,0.6)',
          shadow: 'rgba(0,0,0,0.08)',
        },
      },
      backdropBlur: {
        xs: '2px',
        '3xl': '64px',
        '4xl': '80px',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.10), 0 1.5px 4px rgba(255,255,255,0.7) inset',
        'glass-sm': '0 4px 16px rgba(0,0,0,0.08), 0 1px 2px rgba(255,255,255,0.6) inset',
        'glass-lg': '0 16px 48px rgba(0,0,0,0.13), 0 2px 6px rgba(255,255,255,0.75) inset',
        pill: '0 2px 8px rgba(0,0,0,0.12), 0 1px 2px rgba(255,255,255,0.5) inset',
        'pill-active': '0 1px 3px rgba(0,0,0,0.18) inset',
        neon: '0 0 0 2px rgba(167,139,250,0.5), 0 0 24px rgba(167,139,250,0.25)',
      },
      animation: {
        'blob-slow': 'blob 14s ease-in-out infinite',
        'blob-mid': 'blob 10s ease-in-out infinite 2s',
        'blob-fast': 'blob 8s ease-in-out infinite 4s',
        'float': 'float 4s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'spin-slow': 'spin 6s linear infinite',
        'fade-up': 'fadeUp 0.5s ease forwards',
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.34,1.56,0.64,1) forwards',
      },
      keyframes: {
        blob: {
          '0%, 100%': { transform: 'translate(0,0) scale(1)' },
          '33%':       { transform: 'translate(40px,-40px) scale(1.08)' },
          '66%':       { transform: 'translate(-30px,30px) scale(0.95)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':      { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-400px 0' },
          '100%': { backgroundPosition: '400px 0' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
        scaleIn: {
          from: { opacity: 0, transform: 'scale(0.88)' },
          to:   { opacity: 1, transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
