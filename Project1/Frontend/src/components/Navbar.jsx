import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200
     ${isActive
       ? 'pill-violet text-white shadow-md'
       : 'pill-glass text-[#3b2d6a] hover:text-[#6d28d9]'
     }`;

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4">
      <nav
        className="glass iridescent rounded-full px-4 py-2.5 flex items-center justify-between gap-6 w-full max-w-2xl"
        role="navigation"
        aria-label="Main navigation"
      >
        {/* Brand */}
        <div className="flex items-center gap-2.5 pl-1">
          {/* Hexagon logo */}
          <div className="relative w-8 h-8 flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
              <polygon
                points="16,3 28,9.5 28,22.5 16,29 4,22.5 4,9.5"
                fill="url(#navGrad)"
                opacity="0.9"
              />
              <polygon
                points="16,8 23,12 23,20 16,24 9,20 9,12"
                fill="white"
                opacity="0.3"
              />
              <defs>
                <linearGradient id="navGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#c4b5fd" />
                  <stop offset="100%" stopColor="#6d28d9" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span
            className="font-extrabold text-base tracking-tight"
            style={{ background: 'linear-gradient(135deg,#7c3aed,#06b6d4)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            NeonPost
          </span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-2">
          <NavLink to="/" end className={linkClass} id="nav-create">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Create</span>
          </NavLink>
          <NavLink to="/feed" className={linkClass} id="nav-feed">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="7" height="7" rx="1" />
            </svg>
            <span>Feed</span>
          </NavLink>
        </div>
      </nav>
    </header>
  );
}
