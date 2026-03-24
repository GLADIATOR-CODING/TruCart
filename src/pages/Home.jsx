import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Navigation, TrendingUp, Flame, Users, Heart, Star, X } from 'lucide-react';
import { getFavoriteRestaurants, removeFavorite } from '../data/mockDatabase';
import { motion } from 'framer-motion';

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

// Wow Feature #4: Live ticker messages
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

// Wow Feature #2: Animated counter hook
function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return count;
}

function TiltTile({ tile, onClick, delay }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback((e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setTilt({ x: (y - 0.5) * -24, y: (x - 0.5) * 24 });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="glass-tile aspect-[1.6/1] rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer"
      style={{ perspective: '600px', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false); }}
      onClick={onClick}
    >
      <div
        className="absolute inset-0 rounded-[18px] flex flex-col items-center justify-center gap-1 transition-transform duration-150 ease-out"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.04 : 1})`,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="relative z-10 flex flex-col items-center justify-center gap-0.5" style={{ transform: 'translateZ(20px)' }}>
          <span className="text-2xl md:text-3xl drop-shadow-sm">{tile.emoji}</span>
          <span className="text-[10px] md:text-xs font-bold tracking-wide" style={{ color: 'var(--fg-muted)' }}>{tile.label}</span>
        </div>
        <div
          className={`absolute inset-0 rounded-[18px] ${tile.color}`}
          style={{ opacity: isHovered ? 0.25 : 0, transition: 'opacity 0.4s ease' }}
        />
      </div>
    </motion.div>
  );
}

export default function Home() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [location, setLocation] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);

  const savedAmount = useCountUp(847, 2500);
  const savedOrders = useCountUp(12, 2000);
  const [favorites, setFavorites] = useState(() => getFavoriteRestaurants());

  const handleRemoveFavorite = (e, restaurantId) => {
    e.stopPropagation();
    removeFavorite(restaurantId);
    setFavorites(getFavoriteRestaurants());
  };

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

  return (
    <div className="min-h-screen flex flex-col" style={{ background: 'var(--bg)' }}>
      {/* Top Bar */}
      <div className="pt-8 pb-4 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight" style={{ color: 'var(--fg)' }}>
              Tru<span className="text-brand">Cart</span>
            </h1>
            <p className="text-sm mt-0.5" style={{ color: 'var(--fg-muted)' }}>Compare prices. Save on everything.</p>
          </div>
          <div className="flex items-center gap-4">
            {/* Wow Feature #2: Savings Dashboard */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="glass-tile px-4 py-2 rounded-xl flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                <TrendingUp className="w-4 h-4 text-brand" />
              </div>
              <div>
                <div className="text-lg font-extrabold text-brand leading-none">₹{savedAmount}</div>
                <div className="text-[10px] font-medium" style={{ color: 'var(--fg-faint)' }}>saved across {savedOrders} orders</div>
              </div>
            </motion.div>

            <div className="flex items-center gap-2 text-sm" style={{ color: 'var(--fg-faint)' }}>
              {isDetecting ? (
                <Navigation className="w-4 h-4 text-brand animate-spin" />
              ) : (
                <MapPin className="w-4 h-4 text-brand cursor-pointer" onClick={detectLocation} />
              )}
              <input
                type="text"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="bg-transparent outline-none text-sm font-medium"
                style={{ color: 'var(--fg-muted)', width: '120px' }}
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

      {/* Wow Feature #4: Live Ticker */}
      <div className="overflow-hidden py-4 px-6 md:px-12 max-w-7xl mx-auto w-full">
        <div className="glass-tile rounded-xl px-4 py-2.5 overflow-hidden relative">
          <div className="flex items-center gap-2 absolute left-3 top-1/2 -translate-y-1/2 z-10">
            <Flame className="w-3.5 h-3.5 text-brand" />
            <span className="text-[10px] font-bold uppercase tracking-widest text-brand">Live</span>
          </div>
          <div className="ml-16 overflow-hidden">
            <div className="ticker-track flex gap-12 whitespace-nowrap">
              {[...TICKER_MESSAGES, ...TICKER_MESSAGES].map((msg, i) => (
                <span key={i} className="text-xs font-medium inline-block" style={{ color: 'var(--fg-muted)' }}>
                  {msg}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Personalized: Your Favorites */}
      {favorites.length > 0 && (
        <div className="px-6 md:px-12 pb-4 pt-2 max-w-7xl mx-auto w-full">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-brand" />
              <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--fg-muted)' }}>Your Favorites</span>
            </div>
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2" style={{ scrollbarWidth: 'none' }}>
            {favorites.map((r, i) => (
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
                  onClick={(e) => handleRemoveFavorite(e, r.id)}
                  className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 shadow-sm"
                  style={{ background: 'rgba(0,0,0,0.15)' }}
                  title="Remove from favorites"
                >
                  <X className="w-3 h-3 text-white" strokeWidth={3} />
                </button>
                <img src={r.image} alt={r.name} className="w-10 h-10 rounded-lg object-cover" />
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
        <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-5 gap-3 md:gap-4">
          {HERO_TILES.map((tile, i) => (
            <TiltTile
              key={tile.id}
              tile={tile}
              delay={0.15 + i * 0.03}
              onClick={() => navigate(`/search?q=${encodeURIComponent(tile.query)}`)}
            />
          ))}
        </div>
      </div>

      {/* Bottom Stats Bar */}
      <div className="px-6 md:px-12 pb-6 max-w-7xl mx-auto w-full">
        <div className="glass-tile rounded-xl px-5 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-brand" />
            <span className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>
              <strong className="text-brand">2,847</strong> users comparing prices right now
            </span>
          </div>
          <span className="text-[10px] font-medium" style={{ color: 'var(--fg-faint)' }}>
            Food delivery · More categories coming soon
          </span>
        </div>
      </div>
    </div>
  );
}
