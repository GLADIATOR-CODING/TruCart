import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Clock, CheckCircle2, ExternalLink, ChevronDown, Trophy, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { RESTAURANTS, getMenuItemsForRestaurant, getItemPricing, isFavorite, addFavorite, removeFavorite } from '../data/mockDatabase';

// Wow Feature #5: Animated count-up for savings
function CountUp({ target, duration = 1200 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const startTime = Date.now();
    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [target, duration]);
  return <>{count}</>;
}

export default function RestaurantPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isFav, setIsFav] = useState(() => isFavorite(id));

  const toggleFavorite = () => {
    if (isFav) { removeFavorite(id); } else { addFavorite(id); }
    setIsFav(!isFav);
  };

  const restaurant = RESTAURANTS.find(r => r.id === id);
  const menuItems = getMenuItemsForRestaurant(id);

  if (!restaurant) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <p style={{ color: 'var(--fg-faint)' }}>Restaurant not found.</p>
    </div>
  );

  return (
    <div className="min-h-screen pb-20" style={{ background: 'var(--bg)' }}>
      <div className="h-52 md:h-64 w-full relative overflow-hidden">
        <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover scale-105" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg) 5%, transparent 80%)' }} />
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 glass-tile flex items-center px-4 py-2 rounded-xl text-sm font-medium z-20"
          style={{ color: 'var(--fg)' }}
        >
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </motion.button>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative -mt-16 z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="glass-tile p-6 md:p-8 rounded-2xl mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 relative z-10">
            <div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1" style={{ color: 'var(--fg)' }}>{restaurant.name}</h1>
              <p className="text-sm font-medium mb-3" style={{ color: 'var(--fg-faint)' }}>{restaurant.cuisine}</p>
              <div className="flex items-center text-sm font-medium" style={{ color: 'var(--fg-muted)' }}>
                <Clock className="w-4 h-4 mr-1.5" /> {restaurant.deliveryTime}
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <motion.button
                whileTap={{ scale: 0.85 }}
                onClick={toggleFavorite}
                className="glass-tile w-10 h-10 rounded-xl flex items-center justify-center transition-colors"
                title={isFav ? 'Remove from favorites' : 'Add to favorites'}
              >
                <Heart
                  className={`w-5 h-5 transition-colors ${isFav ? 'text-brand fill-brand' : ''}`}
                  style={!isFav ? { color: 'var(--fg-faint)' } : {}}
                />
              </motion.button>
              <div className="glass-tile px-4 py-2 rounded-xl flex items-center gap-1.5">
                <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                <span className="text-lg font-bold" style={{ color: 'var(--fg)' }}>{restaurant.rating}</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="mb-5 flex items-center gap-3 px-1">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--fg-faint)' }}>Compare Prices</span>
          <div className="flex-1 h-px" style={{ background: 'rgba(0,0,0,0.06)' }} />
        </div>

        <div className="space-y-3">
          {menuItems.map((item, index) => (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08 }}
              key={item.id}
            >
              <MenuItem
                item={item}
                isExpanded={selectedItem === item.id}
                onToggle={() => setSelectedItem(selectedItem === item.id ? null : item.id)}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function MenuItem({ item, isExpanded, onToggle }) {
  const prices = getItemPricing(item.id);
  const cheapest = prices[0];
  const savings = prices.length >= 2 ? prices[prices.length - 1].total - prices[0].total : 0;

  return (
    <div className={`glass-tile overflow-hidden transition-all duration-500 ${isExpanded ? 'winner-card' : 'tilt-hover'}`}>
      <div onClick={onToggle} className="p-4 md:p-5 flex gap-4 cursor-pointer relative z-10">
        {item.image && (
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0">
              <h3 className="text-base font-bold truncate" style={{ color: 'var(--fg)' }}>{item.name}</h3>
              <p className="text-xs mt-0.5 line-clamp-2 leading-relaxed" style={{ color: 'var(--fg-faint)' }}>{item.description}</p>
            </div>
            {!isExpanded && cheapest && (
              <div className="text-right shrink-0">
                <span className="text-[10px] block" style={{ color: 'var(--fg-faint)' }}>cheapest</span>
                <span className="text-base font-bold text-brand">₹{cheapest.total}</span>
              </div>
            )}
          </div>
          <div className="mt-2 flex items-center gap-2">
            <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} style={{ color: 'var(--fg-faint)' }} />
            <span className="text-[11px] font-medium" style={{ color: 'var(--fg-faint)' }}>{isExpanded ? 'Hide' : 'Compare across apps'}</span>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 md:px-5 pb-4 md:pb-5 space-y-2">
              <div className="h-px mb-3" style={{ background: 'rgba(0,0,0,0.05)' }} />

              {/* Wow Feature #1: Animated Price Race — staggered entrance */}
              {prices.map((p, idx) => {
                const isWinner = idx === 0;
                return (
                  <motion.div
                    initial={{ opacity: 0, x: -30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{
                      delay: idx * 0.15,
                      duration: 0.5,
                      ease: [0.23, 1, 0.32, 1]
                    }}
                    key={p.platform.id}
                    className={`glass-tile flex items-center justify-between p-3.5 rounded-xl relative overflow-hidden ${isWinner ? 'winner-card winner-pulse' : 'tilt-hover'}`}
                  >
                    {isWinner && (
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-linear-to-b from-brand-light to-brand rounded-full" />
                    )}

                    <div className="flex items-center gap-3 relative z-10">
                      {/* Wow Feature #5: Winner logo bounce */}
                      <div className={`w-10 h-10 rounded-xl ${p.platform.bgClass} flex items-center justify-center text-white font-bold text-base shadow-md ${isWinner ? 'winner-bounce' : ''}`}>
                        {p.platform.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-sm flex items-center gap-1.5" style={{ color: 'var(--fg)' }}>
                          {p.platform.name}
                          {isWinner && <CheckCircle2 className="w-3.5 h-3.5 text-brand" />}
                        </div>
                        <div className="text-[10px] mt-0.5" style={{ color: 'var(--fg-faint)' }}>
                          Item ₹{p.itemPrice} · Delivery ₹{p.deliveryFee} · Tax ₹{p.taxes} · Fee ₹{p.platformFee}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 relative z-10">
                      <span className={`text-lg font-extrabold ${isWinner ? 'text-brand' : ''}`} style={!isWinner ? { color: 'var(--fg-muted)' } : {}}>
                        ₹{p.total}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); alert(`Redirecting to ${p.platform.name}...`); }}
                        className={`p-2 rounded-lg transition-all active:scale-95 ${isWinner ? 'bg-brand text-white shadow-md shadow-brand/15' : ''}`}
                        style={!isWinner ? { background: 'rgba(0,0,0,0.04)', color: 'var(--fg-faint)' } : {}}
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}

              {/* Wow Feature #5: Animated savings count-up */}
              {savings > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prices.length * 0.15 + 0.2 }}
                  className="glass-tile rounded-xl p-3 flex items-center justify-center gap-2 mt-2"
                >
                  <Trophy className="w-4 h-4 text-brand" />
                  <span className="text-sm font-bold text-brand">
                    Save ₹<CountUp target={savings} duration={800} />
                  </span>
                  <span className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>
                    by ordering from {prices[0].platform.name}
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
