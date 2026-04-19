import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';
import { getUserProfile, updateUserProfile } from '../services/firestore';

/**
 * Tracks which platform memberships the user has:
 *   - Swiggy One
 *   - Zomato Gold
 *   - MagicPin Pro
 *
 * When active, delivery fees + platform fees are waived for that platform.
 */

const AVAILABLE_SUBS = [
  { id: 'swiggy', name: 'Swiggy One', emoji: '🟠', color: 'bg-[#FC8019]', benefit: 'Free delivery on Swiggy' },
  { id: 'zomato', name: 'Zomato Gold', emoji: '🔴', color: 'bg-[#E23744]', benefit: 'Free delivery on Zomato' },
  { id: 'magicpin', name: 'MagicPin Pro', emoji: '🩷', color: 'bg-[#E11452]', benefit: 'Free delivery on MagicPin' },
];

const SubscriptionsContext = createContext(null);

export { AVAILABLE_SUBS };

export function useSubscriptions() {
  const ctx = useContext(SubscriptionsContext);
  if (!ctx) throw new Error('useSubscriptions must be used within SubscriptionsProvider');
  return ctx;
}

export function SubscriptionsProvider({ children }) {
  const { user } = useAuth();
  const [activeSubs, setActiveSubs] = useState([]); // array of platform IDs
  const [loading, setLoading] = useState(true);

  // Load from Firestore on login
  useEffect(() => {
    if (!user) { setActiveSubs([]); setLoading(false); return; }
    (async () => {
      try {
        const profile = await getUserProfile(user.uid);
        setActiveSubs(profile?.subscriptions || []);
      } catch {
        setActiveSubs([]);
      } finally {
        setLoading(false);
      }
    })();
  }, [user]);

  // Toggle a subscription on/off and save to Firestore
  const toggleSub = useCallback(async (platformId) => {
    const next = activeSubs.includes(platformId)
      ? activeSubs.filter(id => id !== platformId)
      : [...activeSubs, platformId];
    setActiveSubs(next);
    if (user) {
      try { await updateUserProfile(user.uid, { subscriptions: next }); }
      catch (err) { console.warn('Failed to save subscriptions:', err.message); }
    }
  }, [activeSubs, user]);

  const hasSub = useCallback((platformId) => activeSubs.includes(platformId), [activeSubs]);

  /**
   * Apply subscription discounts to a pricing array.
   * If user has Swiggy One → Swiggy deliveryFee=0, platformFee=0
   * Returns a NEW sorted array with adjusted totals.
   */
  const applyDiscounts = useCallback((prices) => {
    return prices.map(p => {
      if (hasSub(p.platform.id)) {
        const discountedTotal = p.itemPrice + p.taxes; // no delivery + no platform fee
        return {
          ...p,
          originalTotal: p.total,
          deliveryFee: 0,
          platformFee: 0,
          total: discountedTotal,
          hasSubscription: true,
        };
      }
      return { ...p, originalTotal: p.total, hasSubscription: false };
    }).sort((a, b) => a.total - b.total);
  }, [hasSub]);

  const value = { activeSubs, toggleSub, hasSub, applyDiscounts, loading };

  return (
    <SubscriptionsContext.Provider value={value}>
      {children}
    </SubscriptionsContext.Provider>
  );
}
