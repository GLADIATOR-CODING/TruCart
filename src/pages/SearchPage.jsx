import { useSearchParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Clock } from 'lucide-react';
import { searchRestaurants } from '../data/mockDatabase';
import { motion } from 'framer-motion';

export default function SearchPage() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const navigate = useNavigate();
  const results = searchRestaurants(query);

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 pt-8 pb-20">
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/')}
          className="flex items-center hover:text-brand mb-8 transition-colors font-medium text-sm group"
          style={{ color: 'var(--fg-faint)' }}
        >
          <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-0.5 transition-transform" /> Back
        </motion.button>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-2" style={{ color: 'var(--fg)' }}>
            {query ? (
              <><span style={{ color: 'var(--fg-muted)' }}>Results for </span>"{query}"</>
            ) : 'All Restaurants'}
          </h1>
          <p className="text-sm font-medium" style={{ color: 'var(--fg-faint)' }}>{results.length} places found near you</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {results.map((r, i) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04, duration: 0.5 }}
              key={r.id}
              onClick={() => navigate(`/restaurant/${r.id}`)}
              className="glass-tile tilt-hover cursor-pointer group flex flex-col overflow-hidden"
            >
              <div className="aspect-4/3 overflow-hidden relative">
                <img src={r.image} alt={r.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-linear-to-t from-[#f0ede6] via-transparent to-transparent opacity-70" />
                <div className="absolute bottom-2 left-2 glass-tile px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm!">
                  <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold" style={{ color: 'var(--fg)' }}>{r.rating}</span>
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between relative z-10">
                <div>
                  <h3 className="text-sm font-bold truncate" style={{ color: 'var(--fg)' }}>{r.name}</h3>
                  <p className="text-[11px] truncate mt-0.5" style={{ color: 'var(--fg-faint)' }}>{r.cuisine}</p>
                </div>
                <div className="flex justify-between items-end mt-3 pt-2" style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}>
                  <div className="flex items-center text-[10px] font-medium" style={{ color: 'var(--fg-faint)' }}>
                    <Clock className="w-3 h-3 mr-1" /> {r.deliveryTime}
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] block" style={{ color: 'var(--fg-faint)' }}>from</span>
                    <span className="text-sm font-bold text-brand">₹{r.startsFrom}</span>
                  </div>
                </div>
              </div>
            </motion.div>
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
