import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Search, LayoutDashboard, UserCircle, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useState, useRef, useEffect, useCallback } from 'react';

const NAV_LINKS = [
  { to: '/', icon: Home, label: 'Home' },
  { to: '/search', icon: Search, label: 'Search' },
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
];

/**
 * Persistent navigation bar with user avatar and route highlighting.
 */
export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    }
  }, [logout, navigate]);

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'User';
  const photoURL = user?.photoURL;

  return (
    <nav className="glass-tile sticky top-0 z-50 rounded-none border-x-0 border-t-0" style={{ borderRadius: 0 }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 flex items-center justify-between h-14">
        {/* Logo */}
        <button onClick={() => navigate('/')} className="flex items-center gap-2 group">
          <img src="/trucart-logo.svg" alt="TruCart Logo" className="w-7 h-7 transition-transform group-hover:scale-105" />
          <h1 className="text-xl font-extrabold tracking-tight" style={{ color: 'var(--fg)' }}>
            Tru<span className="text-brand">Cart</span>
          </h1>
        </button>

        {/* Nav Links */}
        <div className="hidden sm:flex items-center gap-1">
          {NAV_LINKS.map(({ to, icon: Icon, label }) => {
            const isActive = location.pathname === to || (to === '/search' && location.pathname.startsWith('/search'));
            return (
              <button
                key={to}
                onClick={() => navigate(to)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isActive ? 'bg-brand/10 text-brand' : 'hover:bg-black/[0.03]'}`}
                style={!isActive ? { color: 'var(--fg-muted)' } : {}}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            );
          })}
        </div>

        {/* User Menu */}
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 px-2 py-1 rounded-xl hover:bg-black/[0.03] transition-colors"
          >
            {photoURL ? (
              <img src={photoURL} alt="" className="w-7 h-7 rounded-full object-cover" referrerPolicy="no-referrer" />
            ) : (
              <div className="w-7 h-7 rounded-full bg-brand/10 flex items-center justify-center">
                <span className="text-xs font-bold text-brand">{displayName[0]?.toUpperCase()}</span>
              </div>
            )}
            <span className="text-sm font-medium hidden sm:block" style={{ color: 'var(--fg-muted)' }}>
              {displayName}
            </span>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 glass-tile rounded-xl py-1 w-48 shadow-lg z-50">
              <button
                onClick={() => { navigate('/profile'); setMenuOpen(false); }}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium hover:bg-black/[0.03] transition-colors"
                style={{ color: 'var(--fg-muted)' }}
              >
                <UserCircle className="w-4 h-4" /> Profile
              </button>

              {/* Mobile nav links */}
              <div className="sm:hidden border-t border-black/[0.04] my-1">
                {NAV_LINKS.map(({ to, icon: Icon, label }) => (
                  <button
                    key={to}
                    onClick={() => { navigate(to); setMenuOpen(false); }}
                    className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium hover:bg-black/[0.03] transition-colors"
                    style={{ color: 'var(--fg-muted)' }}
                  >
                    <Icon className="w-4 h-4" /> {label}
                  </button>
                ))}
              </div>

              <div className="border-t border-black/[0.04] my-1" />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 w-full px-4 py-2.5 text-sm font-medium hover:bg-red-50 text-red-500 transition-colors"
              >
                <LogOut className="w-4 h-4" /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
