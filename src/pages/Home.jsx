import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Navigation, TrendingUp, Flame, Users, Heart, Star, X, Crown } from 'lucide-react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import TiltTile from '../components/TiltTile';
import SubscriptionModal from '../components/SubscriptionModal';
import { useCountUp } from '../hooks/useCountUp';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext';
import { getComparisonHistory } from '../services/firestore';

const HERO_TILES = [
  { id: 1, emoji: '🍔', label: 'Burgers', color: 'bg-orange-400', query: 'Burgers' },
  { id: 2, emoji: '🍕', label: 'Pizza', color: 'bg-red-400', query: 'Pizza' },
  { id: 3, emoji: '🍲', label: 'Thali', color: 'bg-yellow-400', query: 'Thali' },
  { id: 4, emoji: '🥘', label: 'South Indian', color: 'bg-teal-400', query: 'South Indian' },
  { id: 5, emoji: '☕', label: 'Coffee', color: 'bg-amber-700', query: 'Coffee' },
  { id: 6, emoji: '🫔', label: 'Biryani', color: 'bg-orange-600', query: 'Biryani' },
  { id: 7, emoji: '🥡', label: 'Chinese', color: 'bg-red-500', query: 'Chinese' },
  { id: 8, emoji: '🧁', label: 'Desserts', color: 'bg-pink-400', query: 'Desserts' },
  { id: 9, emoji: '🥙', label: 'Wraps', color: 'bg-lime-500', query: 'Wraps' },
  { id: 10, emoji: '🥗', label: 'Healthy', color: 'bg-emerald-400', query: 'Healthy' },
  { id: 11, emoji: '🍟', label: 'Fries', color: 'bg-yellow-500', query: 'Burgers' },
  { id: 12, emoji: '🍗', label: 'Chicken', color: 'bg-amber-500', query: 'Burgers' },
  { id: 13, emoji: '🍣', label: 'Sushi', color: 'bg-sky-400', query: 'Chinese' },
  { id: 14, emoji: '🥐', label: 'Bakery', color: 'bg-amber-300', query: 'Desserts' },
  { id: 15, emoji: '🍜', label: 'Noodles', color: 'bg-red-500', query: 'Chinese' },
  { id: 16, emoji: '🧆', label: 'Falafel', color: 'bg-green-500', query: 'Wraps' },
  { id: 17, emoji: '🍩', label: 'Donuts', color: 'bg-pink-500', query: 'Desserts' },
  { id: 18, emoji: '🥤', label: 'Shakes', color: 'bg-rose-400', query: 'Desserts' },
  { id: 19, emoji: '🍰', label: 'Cakes', color: 'bg-fuchsia-400', query: 'Desserts' },
  { id: 20, emoji: '🌮', label: 'Tacos', color: 'bg-lime-400', query: 'Wraps' },
];

const TICKER_MESSAGES = [
  '🔥 42 people compared Burger King prices in the last hour',
  '💰 Aarav saved ₹87 on Domino\'s by switching to DigiHaat',
  '📊 Swiggy is 12% cheaper for coffee orders today',
  '🎯 MagicPin has free delivery on Thali orders right now',
  '⚡ 156 price comparisons made in your area today',
  '🏆 DigiHaat is winning on 68% of items this week',
  '🍕 Pizza orders are 15% cheaper on MagicPin today',
  '☕ Third Wave Coffee is trending — 89 comparisons today',
];

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { favoriteRestaurants, removeFavorite } = useFavorites();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [isSubModalOpen, setIsSubModalOpen] = useState(false);

  const [totalSaved, setTotalSaved] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);

  useEffect(() => {
    if (!user) {
      setTotalSaved(0);
      setTotalOrders(0);
      return;
    }
    let cancelled = false;
    (async () => {
      try {
        const data = await getComparisonHistory(user.uid);
        if (!cancelled) {
          setTotalSaved(data.reduce((sum, h) => sum + (h.savedAmount || 0), 0));
          setTotalOrders(data.length);
        }
      } catch (err) {
        console.error('Failed to load history on home:', err);
      }
    })();
    return () => { cancelled = true; };
  }, [user]);

  const savedAmount = useCountUp(totalSaved, 2000);
  const savedOrders = useCountUp(totalOrders, 1500);

  // Memoize ticker messages to avoid re-creating on every render
  const doubledTicker = useMemo(() => [...TICKER_MESSAGES, ...TICKER_MESSAGES], []);

  useEffect(() => { detectLocation(); }, []);

  const detectLocation = () => {
    setIsDetecting(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${pos.coords.latitude}&lon=${pos.coords.longitude}`);
            const data = await res.json();
            setLocation(data.address.suburb || data.address.city || data.address.town || 'Your Area');
          } catch { setLocation('Your Area'); }
          setIsDetecting(false);
        },
        () => { setLocation('Enter Location'); setIsDetecting(false); }
      );
    } else { setLocation('Enter Location'); setIsDetecting(false); }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(query.trim() ? `/search?q=${encodeURIComponent(query)}` : '/search');
  };

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'there';

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      <Navbar />

      {/* Top Bar */}
      <div className="pt-6 pb-4 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
        >
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight" style={{ color: 'var(--fg)' }}>
              Hey {displayName} 👋
            </h2>
            <p className="text-sm mt-0.5" style={{ color: 'var(--fg-muted)' }}>What are you craving today?</p>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mt-4 sm:mt-0">
            {/* Savings Dashboard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-tile px-4 py-2 rounded-xl flex items-center gap-3 shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center shrink-0">
                <TrendingUp className="w-4 h-4 text-brand" />
              </div>
              <div>
                <div className="text-lg font-extrabold text-brand leading-none">₹{savedAmount}</div>
                <div className="text-[10px] font-medium" style={{ color: 'var(--fg-faint)' }}>saved across {savedOrders} orders</div>
              </div>
            </motion.div>

            {/* Memberships Button */}
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35 }}
              onClick={() => setIsSubModalOpen(true)}
              className="glass-tile w-12 h-12 rounded-xl flex items-center justify-center hover:bg-black transition-colors group shrink-0"
              title="Your Memberships"
              aria-label="Manage Memberships"
            >
              <Crown className="w-5 h-5 text-brand group-hover:scale-110 transition-transform" />
            </motion.button>

            <div className="flex items-center gap-2 text-sm shrink-0" style={{ color: 'var(--fg-faint)' }}>
              {isDetecting ? (
                <Navigation className="w-4 h-4 text-brand animate-spin" />
              ) : (
                <MapPin className="w-4 h-4 text-brand cursor-pointer" onClick={detectLocation} aria-label="Detect Location" role="button" tabIndex={0} />
              )}
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                aria-label="Location"
                className="bg-transparent outline-none text-sm font-medium w-24 sm:w-32"
                style={{ color: 'var(--fg-muted)' }}
              />
            </div>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.form
          onSubmit={handleSearch}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-tile rounded-2xl p-1.5 flex items-center"
        >
          <div className="flex flex-1 items-center px-4 py-3 group">
            <Search className="w-5 h-5 mr-3 shrink-0 group-focus-within:text-brand transition-colors" style={{ color: 'var(--fg-faint)' }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="What are you craving? Try 'Burger', 'Pizza', 'Coffee'..."
              className="w-full bg-transparent outline-none text-base font-medium"
              style={{ color: 'var(--fg)' }}
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="bg-brand hover:bg-brand-dark text-white px-7 py-3.5 rounded-[14px] font-semibold text-sm transition-all active:scale-[0.97] shadow-md shadow-brand/15 shrink-0"
          >
            Search
          </button>
        </motion.form>
      </div>

      {/* Live Ticker */}
      <div className="overflow-hidden py-4 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="glass-tile rounded-xl px-4 py-2.5 overflow-hidden relative">
          <div className="flex items-center gap-2 absolute left-3 top-1/2 -translate-y-1/2 z-10">
            <Flame className="w-3.5 h-3.5 text-brand" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand">Live</span>
          </div>
          <div className="ml-16 overflow-hidden">
            <div className="ticker-track flex gap-12 whitespace-nowrap">
              {doubledTicker.map((msg, i) => (
                <span key={i} className="text-xs font-medium inline-block" style={{ color: 'var(--fg-muted)' }}>
                  {msg}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Your Favorites */}
      {favoriteRestaurants.length > 0 && (
        <div className="px-6 md:px-12 pb-4 pt-2 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-brand" />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--fg-muted)' }}>Your Favorites</span>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {favoriteRestaurants.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                layout
                onClick={() => navigate(`/restaurant/${r.id}`)}
                className="glass-tile tilt-hover cursor-pointer shrink-0 flex items-center gap-3 px-4 py-3 rounded-xl relative group"
                style={{ minWidth: '220px' }}
              >
                <button
                  onClick={(e) => { e.stopPropagation(); removeFavorite(r.id); }}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-sm"
                  style={{ background: 'rgba(0,0,0,0.15)' }}
                  title="Remove from favorites"
                >
                  <X className="w-3 h-3 text-white" strokeWidth={3} />
                </button>
                <img src={r.image} alt={r.name} className="w-10 h-10 rounded-lg object-cover" loading="lazy" />
                <div className="min-w-0">
                  <h4 className="text-sm font-bold truncate" style={{ color: 'var(--fg)' }}>{r.name}</h4>
                  <div className="flex items-center gap-1 text-[10px] font-medium" style={{ color: 'var(--fg-faint)' }}>
                    <Star className="w-3 h-3 text-amber-500 fill-amber-500" /> {r.rating} · from ₹{r.startsFrom}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Hero Tile Grid */}
      <div className="flex-1 px-6 md:px-12 pb-8 pt-2 max-w-7xl mx-auto w-full">
        {/* Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
          {HERO_TILES.map((tile, i) => (
            <TiltTile
              key={tile.id}
              tile={tile}
              delay={0.15 + i * 0.03}
              onClick={() => navigate(`/search?q=${encodeURIComponent(tile.query)}`)}
            />
          ))}
        </div>
        
        {/* Mobile Horizontal Scroll Grid */}
        <div 
          className="grid sm:hidden grid-rows-2 grid-flow-col gap-3 overflow-x-auto pb-4 snap-x" 
          style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
        >
          {HERO_TILES.map((tile, i) => (
            <div className="w-[105px] snap-start shrink-0" key={`mobile-${tile.id}`}>
              <TiltTile
                tile={tile}
                delay={0.15 + i * 0.03}
                onClick={() => navigate(`/search?q=${encodeURIComponent(tile.query)}`)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="px-6 md:px-12 pb-6 max-w-7xl mx-auto w-full">
        <div className="glass-tile rounded-xl px-5 py-3 flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <Users className="w-4 h-4 text-brand shrink-0" />
            <span className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>
              <strong className="text-brand">2,847</strong> users comparing prices right now
            </span>
          </div>
          <span className="text-[10px] font-medium" style={{ color: 'var(--fg-faint)' }}>
            Food delivery · More categories coming soon
          </span>
        </div>
      </div>

      {/* Subscription Modal */}
      <SubscriptionModal isOpen={isSubModalOpen} onClose={() => setIsSubModalOpen(false)} />
    </div>
  );
}
