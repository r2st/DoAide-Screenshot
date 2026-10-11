import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

const NAV_ITEMS = [
  { path: '/code', label: 'Code' },
  { path: '/tweet', label: 'Tweet' },
  { path: '/browser', label: 'Browser' },
  { path: '/phone', label: 'Phone' },
  { path: '/compare', label: 'Compare' },
  { path: '/capture', label: 'Capture' },
  { path: '/annotate', label: 'Annotate' },
  { path: '/crop', label: 'Crop' },
  { path: '/pdf', label: 'PDF' },
];

export default function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-1.5 no-underline shrink-0">
            <span className="text-xl font-bold text-da-text">DoAide</span>
            <span className="text-xl font-light text-da-muted">|</span>
            <span className="text-xl font-bold text-brand-primary">Screenshot</span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors no-underline ${
                  location.pathname === item.path
                    ? 'bg-brand-primary/10 text-brand-primary'
                    : 'text-da-muted hover:text-da-text hover:bg-da-surface'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/blog"
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors no-underline ${
                location.pathname.startsWith('/blog')
                  ? 'bg-brand-primary/10 text-brand-primary'
                  : 'text-da-muted hover:text-da-text hover:bg-da-surface'
              }`}
            >
              Blog
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="lg:hidden text-da-muted hover:text-da-text p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {menuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden pb-4 grid grid-cols-3 gap-1">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMenuOpen(false)}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors no-underline text-center ${
                  location.pathname === item.path
                    ? 'bg-brand-primary/10 text-brand-primary'
                    : 'text-da-muted hover:text-da-text hover:bg-da-surface'
                }`}
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/blog"
              onClick={() => setMenuOpen(false)}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors no-underline text-center ${
                location.pathname.startsWith('/blog')
                  ? 'bg-brand-primary/10 text-brand-primary'
                  : 'text-da-muted hover:text-da-text hover:bg-da-surface'
              }`}
            >
              Blog
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
