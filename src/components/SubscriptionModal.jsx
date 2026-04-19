import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, Crown } from 'lucide-react';
import { useSubscriptions, AVAILABLE_SUBS } from '../context/SubscriptionsContext';

/**
 * Modal popup for selecting platform memberships.
 * User checks which subscriptions they have → delivery fees are waived in price comparisons.
 */
export default function SubscriptionModal({ isOpen, onClose }) {
  const { activeSubs, toggleSub } = useSubscriptions();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="glass-tile max-w-md w-full p-6 md:p-8 rounded-2xl pointer-events-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                    <Crown className="w-5 h-5 text-brand" />
                  </div>
                  <div>
                    <h2 className="text-lg font-extrabold" style={{ color: 'var(--fg)' }}>
                      Your Memberships
                    </h2>
                    <p className="text-xs" style={{ color: 'var(--fg-faint)' }}>
                      We'll skip delivery fees for these
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-lg flex items-center justify-center hover:bg-black/[0.04] transition-colors"
                >
                  <X className="w-4 h-4" style={{ color: 'var(--fg-faint)' }} />
                </button>
              </div>

              {/* Subscription Cards */}
              <div className="space-y-3 mb-6">
                {AVAILABLE_SUBS.map((sub) => {
                  const isActive = activeSubs.includes(sub.id);
                  return (
                    <button
                      key={sub.id}
                      onClick={() => toggleSub(sub.id)}
                      className={`w-full glass-tile p-4 rounded-xl flex items-center gap-4 transition-all ${
                        isActive ? 'ring-2 ring-brand shadow-md' : ''
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl ${sub.color} flex items-center justify-center text-lg shrink-0`}>
                        {sub.emoji}
                      </div>
                      <div className="text-left flex-1 min-w-0">
                        <div className="text-sm font-bold" style={{ color: 'var(--fg)' }}>
                          {sub.name}
                        </div>
                        <div className="text-[11px]" style={{ color: 'var(--fg-faint)' }}>
                          {sub.benefit}
                        </div>
                      </div>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        isActive ? 'bg-brand shadow-sm' : 'border-2 border-black/10'
                      }`}>
                        {isActive && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation */}
              <div className="glass-tile rounded-xl p-3 mb-4">
                <p className="text-[11px] text-center leading-relaxed" style={{ color: 'var(--fg-muted)' }}>
                  {activeSubs.length > 0
                    ? `✨ Delivery & platform fees will be removed for ${activeSubs.length} platform${activeSubs.length > 1 ? 's' : ''} in all price comparisons.`
                    : '💡 Select your active memberships so we can show you the real price you pay.'}
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-full bg-brand hover:bg-brand-dark text-white py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.97] shadow-md shadow-brand/15"
              >
                Done
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
