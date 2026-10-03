import { Link, useLocation } from 'react-router-dom';

const NAV_ITEMS = [
  { path: '/code', label: 'Code' },
  { path: '/tweet', label: 'Tweet' },
  { path: '/browser', label: 'Browser' },
  { path: '/phone', label: 'Phone' },
  { path: '/compare', label: 'Compare' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="glass sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span className="text-xl font-bold text-white">DoAide</span>
            <span className="text-xl font-bold italic text-brand-gold">Screenshot</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors no-underline ${
                  location.pathname === item.path
                    ? 'bg-brand-gold/20 text-brand-gold'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu */}
          <div className="md:hidden flex items-center gap-1 overflow-x-auto">
            {NAV_ITEMS.map(item => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2 py-1 rounded text-xs font-medium transition-colors no-underline whitespace-nowrap ${
                  location.pathname === item.path
                    ? 'bg-brand-gold/20 text-brand-gold'
                    : 'text-slate-400'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
