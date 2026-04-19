import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home } from 'lucide-react';

/**
 * Custom 404 page — shown for any unmatched routes.
 */
export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-8" style={{ background: 'var(--bg)' }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-tile max-w-md w-full p-10 rounded-3xl text-center"
      >
        <div className="text-7xl mb-4">🍽️</div>
        <h1 className="text-5xl font-extrabold tracking-tight mb-2" style={{ color: 'var(--fg)' }}>
          4<span className="text-brand">0</span>4
        </h1>
        <h2 className="text-lg font-bold mb-2" style={{ color: 'var(--fg-muted)' }}>
          Page not found
        </h2>
        <p className="text-sm mb-8" style={{ color: 'var(--fg-faint)' }}>
          Looks like this page got lost on its way to the restaurant.
        </p>
        <button
          onClick={() => navigate('/')}
          className="bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.97] shadow-md shadow-brand/15 inline-flex items-center gap-2"
        >
          <Home className="w-4 h-4" /> Go home
        </button>
      </motion.div>
    </div>
  );
}
