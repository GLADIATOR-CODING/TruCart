import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { TrendingUp, Trash2, Clock, Trophy, Star, X, History } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { getComparisonHistory, deleteHistoryEntry, clearComparisonHistory } from '../services/firestore';
import { useCountUp } from '../hooks/useCountUp';
import { RESTAURANTS } from '../data/mockDatabase';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { favoriteRestaurants, removeFavorite } = useFavorites();
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // Fetch comparison history from Firestore
  useEffect(() => {
    if (!user) return;
    let cancelled = false;
    (async () => {
      try {
        const data = await getComparisonHistory(user.uid);
        if (!cancelled) setHistory(data);
      } catch (err) {
        console.error('Failed to load history:', err);
      } finally {
        if (!cancelled) setLoadingHistory(false);
      }
    })();
    return () => { cancelled = true; };
  }, [user]);

  // Memoized savings calculations
  const totalSavings = useMemo(() => history.reduce((sum, h) => sum + (h.savedAmount || 0), 0), [history]);
  const totalComparisons = useMemo(() => history.length, [history]);

  const animatedSavings = useCountUp(totalSavings, 2000);
  const animatedComparisons = useCountUp(totalComparisons, 1500);

  const handleDeleteEntry = async (historyId) => {
    if (!user) return;
    try {
      await deleteHistoryEntry(user.uid, historyId);
      setHistory(prev => prev.filter(h => h.id !== historyId));
    } catch (err) {
      console.error('Failed to delete entry:', err);
    }
  };

  const handleClearAll = async () => {
    if (!user || !history.length) return;
    try {
      await clearComparisonHistory(user.uid);
      setHistory([]);
    } catch (err) {
      console.error('Failed to clear history:', err);
    }
  };

  return (
    <div className="min-h-screen" style={{ background: 'var(--bg)' }}>
      <Navbar />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-12 pt-8 pb-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2" style={{ color: 'var(--fg)' }}>
            Dashboard
          </h1>
          <p className="text-sm font-medium mb-8" style={{ color: 'var(--fg-faint)' }}>
            Your savings overview and comparison history
          </p>
        </motion.div>

        {/* ── Stats Cards ── */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-tile p-5 rounded-2xl">
            <TrendingUp className="w-5 h-5 text-brand mb-2" />
            <div className="text-2xl font-extrabold text-brand">₹{animatedSavings}</div>
            <div className="text-[11px] font-medium mt-1" style={{ color: 'var(--fg-faint)' }}>Total saved</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="glass-tile p-5 rounded-2xl">
            <History className="w-5 h-5 text-brand mb-2" />
            <div className="text-2xl font-extrabold" style={{ color: 'var(--fg)' }}>{animatedComparisons}</div>
            <div className="text-[11px] font-medium mt-1" style={{ color: 'var(--fg-faint)' }}>Comparisons made</div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-tile p-5 rounded-2xl">
            <Star className="w-5 h-5 text-amber-500 fill-amber-500 mb-2" />
            <div className="text-2xl font-extrabold" style={{ color: 'var(--fg)' }}>{favoriteRestaurants.length}</div>
            <div className="text-[11px] font-medium mt-1" style={{ color: 'var(--fg-faint)' }}>Favorites</div>
          </motion.div>
        </div>

        {/* ── Favorites Section ── */}
        {favoriteRestaurants.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="mb-10">
            <h2 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--fg-muted)' }}>
              ❤️ Your Favorites
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {favoriteRestaurants.map((r, i) => (
                <motion.div
                  key={r.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 + i * 0.04 }}
                  className="glass-tile tilt-hover cursor-pointer p-3 rounded-xl relative group"
                  onClick={() => navigate(`/restaurant/${r.id}`)}
                >
                  <button
                    onClick={(e) => { e.stopPropagation(); removeFavorite(r.id); }}
                    className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 bg-red-500 shadow-sm"
                    title="Remove"
                  >
                    <X className="w-3 h-3 text-white" strokeWidth={3} />
                  </button>
                  <img src={r.image} alt={r.name} className="w-full aspect-video rounded-lg object-cover mb-2" loading="lazy" />
                  <h4 className="text-sm font-bold truncate" style={{ color: 'var(--fg)' }}>{r.name}</h4>
                  <div className="flex items-center gap-1 text-[10px] font-medium mt-0.5" style={{ color: 'var(--fg-faint)' }}>
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {r.rating} · from ₹{r.startsFrom}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Comparison History ── */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--fg-muted)' }}>
              📊 Comparison History
            </h2>
            {history.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs font-medium text-red-400 hover:text-red-500 flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3 h-3" /> Clear all
              </button>
            )}
          </div>

          {loadingHistory ? (
            <div className="space-y-3">
              {[1, 2, 3].map(i => (
                <div key={i} className="glass-tile rounded-xl p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg skeleton-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-1/3 rounded skeleton-pulse" />
                    <div className="h-3 w-1/2 rounded skeleton-pulse" />
                  </div>
                </div>
              ))}
            </div>
          ) : history.length === 0 ? (
            <div className="glass-tile rounded-2xl p-10 text-center">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-lg font-bold mb-1" style={{ color: 'var(--fg)' }}>No comparisons yet</h3>
              <p className="text-sm" style={{ color: 'var(--fg-faint)' }}>
                Visit a restaurant and compare prices — your history will appear here.
              </p>
              <button
                onClick={() => navigate('/search')}
                className="mt-4 bg-brand text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all active:scale-[0.97] shadow-md shadow-brand/15"
              >
                Start comparing
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {history.map((entry, i) => {
                const restaurant = RESTAURANTS.find(r => r.id === entry.restaurantName);
                return (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="glass-tile tilt-hover rounded-xl p-4 flex items-center gap-4 group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                      <Trophy className="w-5 h-5 text-brand" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold truncate" style={{ color: 'var(--fg)' }}>{entry.itemName}</h4>
                      <div className="text-[11px] font-medium" style={{ color: 'var(--fg-faint)' }}>
                        {restaurant?.name || entry.restaurantName} · Best on {entry.cheapestPlatform}
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      {entry.savedAmount > 0 && (
                        <div className="text-sm font-bold text-brand">₹{entry.savedAmount} saved</div>
                      )}
                      <div className="text-[10px]" style={{ color: 'var(--fg-faint)' }}>
                        {entry.comparedAt?.toDate ? new Date(entry.comparedAt.toDate()).toLocaleDateString() : ''}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteEntry(entry.id)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-red-50"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
