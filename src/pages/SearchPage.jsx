import { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { searchRestaurants } from '../data/mockDatabase';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import RestaurantCard from '../components/RestaurantCard';
import { useDebounce } from '../hooks/useDebounce';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const navigate = useNavigate();
  const [liveQuery, setLiveQuery] = useState(initialQuery);

  // Debounce to prevent filtering on every keystroke
  const debouncedQuery = useDebounce(liveQuery, 250);

  // Memoize search results — only recalculates when debouncedQuery changes
  const results = useMemo(() => searchRestaurants(debouncedQuery), [debouncedQuery]);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-8 pb-20">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center hover:text-brand mb-6 transition-colors font-medium text-sm group"
          style={{ color: 'var(--fg-faint)' }}
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-0.5 transition-transform" /> Back
        </motion.button>

        {/* Live search input */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="glass-tile rounded-2xl p-1.5 flex items-center mb-4">
            <input
              type="text"
              value={liveQuery}
              onChange={(e) => setLiveQuery(e.target.value)}
              placeholder="Search restaurants, cuisines, items..."
              className="w-full bg-transparent outline-none text-base font-medium px-4 py-3"
              style={{ color: 'var(--fg)' }}
              autoFocus
            />
          </div>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--fg)' }}>
              {debouncedQuery ? (
                <><span style={{ color: 'var(--fg-muted)' }}>Results for </span>"{debouncedQuery}"</>
              ) : 'All Restaurants'}
            </h1>
            <p className="text-sm font-medium" style={{ color: 'var(--fg-faint)' }}>{results.length} found</p>
          </div>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {results.map((r, i) => (
            <RestaurantCard
              key={r.id}
              restaurant={r}
              index={i}
              onClick={() => navigate(`/restaurant/${r.id}`)}
            />
          ))}
        </div>

        {results.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
            <div className="text-6xl mb-4">🍽️</div>
            <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--fg)' }}>No matches found</h3>
            <p className="text-sm" style={{ color: 'var(--fg-faint)' }}>Try "Burger", "Pizza", "Thali", "South Indian", or "Coffee"</p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
