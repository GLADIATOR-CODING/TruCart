import { useState, useCallback } from 'react';
import { ChevronDown, CheckCircle2, ExternalLink, Trophy } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import CountUp from './CountUp';
import { getItemPricing } from '../data/mockDatabase';
import { useAuth } from '../context/AuthContext';
import { useSubscriptions } from '../context/SubscriptionsContext';
import { addComparisonHistory } from '../services/firestore';

/**
 * A single menu item card with expandable price comparison across platforms.
 * "Save comparison" writes the result to Firestore history.
 */
export default function MenuItem({ item, isExpanded, onToggle }) {
  const rawPrices = getItemPricing(item.id);
  const { applyDiscounts } = useSubscriptions();
  const prices = applyDiscounts(rawPrices);
  const cheapest = prices[0];
  const savings = prices.length >= 2 ? prices[prices.length - 1].total - cheapest.total : 0;
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  const handleSaveComparison = useCallback(async (e) => {
    e.stopPropagation();
    if (!user || saved) return;
    try {
      await addComparisonHistory(user.uid, {
        itemName: item.name,
        restaurantName: item.restaurantId,
        cheapestPlatform: cheapest.platform.name,
        savedAmount: savings,
        prices: prices.map(p => ({
          platform: p.platform.name,
          total: p.total,
        })),
      });
      setSaved(true);
    } catch (err) {
      console.error('Failed to save comparison:', err);
    }
  }, [user, item, cheapest, savings, prices, saved]);

  return (
    <div className={`glass-tile overflow-hidden transition-all duration-500 ${isExpanded ? 'winner-card' : 'tilt-hover'}`}>
      <div onClick={onToggle} className="p-4 md:p-5 flex gap-4 cursor-pointer relative z-10">
        {item.image && (
          <div className="w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden shrink-0">
            <img src={item.image} alt={item.name} className="w-full h-full object-cover" loading="lazy" />
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

              {prices.map((p, idx) => {
                const isWinner = idx === 0;
                return (
                  <motion.div
                    initial={{ opacity: 0, x: -30, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ delay: idx * 0.15, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                    key={p.platform.id}
                    className={`glass-tile flex items-center justify-between p-3.5 rounded-xl relative overflow-hidden ${isWinner ? 'winner-card winner-pulse' : 'tilt-hover'}`}
                  >
                    {isWinner && (
                      <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-linear-to-b from-brand-light to-brand rounded-full" />
                    )}
                    <div className="flex items-center gap-3 relative z-10">
                      <div className={`w-10 h-10 rounded-xl ${p.platform.bgClass} flex items-center justify-center text-white font-bold text-base shadow-md ${isWinner ? 'winner-bounce' : ''}`}>
                        {p.platform.name[0]}
                      </div>
                      <div>
                        <div className="font-bold text-sm flex items-center gap-1.5" style={{ color: 'var(--fg)' }}>
                          {p.platform.name}
                          {isWinner && <CheckCircle2 className="w-3.5 h-3.5 text-brand" />}
                          {p.coupon && (
                            <span className="ml-1 flex items-center text-[9px] font-extrabold uppercase tracking-widest px-1.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-500 border border-emerald-500/20">
                              {p.coupon.code}
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] mt-0.5" style={{ color: 'var(--fg-faint)' }}>
                          Item ₹{p.itemPrice}
                          {p.coupon && <span className="text-emerald-500 font-bold ml-1">(-₹{p.coupon.discount})</span>}
                          {p.hasSubscription ? (
                            <span className="text-brand font-medium ml-1">· Free Delivery ✨</span>
                          ) : (
                            <span> · Delivery ₹{p.deliveryFee} · Tax ₹{p.taxes} · Fee ₹{p.platformFee}</span>
                          )}
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

              {savings > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: prices.length * 0.15 + 0.2 }}
                  className="glass-tile rounded-xl p-3 flex items-center justify-between mt-2"
                >
                  <div className="flex items-center gap-2">
                    <Trophy className="w-4 h-4 text-brand" />
                    <span className="text-sm font-bold text-brand">
                      Save ₹<CountUp target={savings} duration={800} />
                    </span>
                    <span className="text-xs font-medium" style={{ color: 'var(--fg-muted)' }}>
                      by ordering from {prices[0].platform.name}
                    </span>
                  </div>
                  <button
                    onClick={handleSaveComparison}
                    className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all active:scale-95 ${saved ? 'bg-brand/10 text-brand' : 'bg-brand text-white shadow-sm shadow-brand/15'}`}
                    disabled={saved}
                  >
                    {saved ? '✓ Saved' : 'Save'}
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
