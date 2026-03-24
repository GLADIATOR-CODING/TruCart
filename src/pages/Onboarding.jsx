import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronRight, Sparkles } from 'lucide-react';
import { migrateOnboardingToFavorites } from '../data/mockDatabase';

const ONBOARDING_RESTAURANTS = [
  { id: 'ob1', name: 'Burger King', emoji: '🍔', color: 'bg-orange-400' },
  { id: 'ob2', name: "McDonald's", emoji: '🍟', color: 'bg-yellow-500' },
  { id: 'ob3', name: "Domino's", emoji: '🍕', color: 'bg-red-400' },
  { id: 'ob4', name: 'Pizza Hut', emoji: '🍕', color: 'bg-red-500' },
  { id: 'ob5', name: 'Starbucks', emoji: '☕', color: 'bg-emerald-700' },
  { id: 'ob6', name: 'Truffles', emoji: '🍔', color: 'bg-amber-600' },
  { id: 'ob7', name: 'Rameshwaram Cafe', emoji: '🥘', color: 'bg-teal-500' },
  { id: 'ob8', name: 'Third Wave Coffee', emoji: '☕', color: 'bg-amber-700' },
  { id: 'ob9', name: 'Rajdhani Thali', emoji: '🍲', color: 'bg-yellow-500' },
  { id: 'ob10', name: 'MTR', emoji: '🥘', color: 'bg-green-600' },
  { id: 'ob11', name: "La Pino'z Pizza", emoji: '🍕', color: 'bg-red-600' },
  { id: 'ob12', name: 'Ovenstory', emoji: '🍕', color: 'bg-orange-500' },
  { id: 'ob13', name: "Wendy's", emoji: '🍔', color: 'bg-red-500' },
  { id: 'ob14', name: 'Blue Tokai', emoji: '☕', color: 'bg-sky-700' },
  { id: 'ob15', name: 'Nagarjuna', emoji: '🍛', color: 'bg-orange-600' },
  { id: 'ob16', name: 'Vidyarthi Bhavan', emoji: '🥘', color: 'bg-green-500' },
  { id: 'ob17', name: 'Toscano', emoji: '🍕', color: 'bg-amber-500' },
  { id: 'ob18', name: 'Costa Coffee', emoji: '☕', color: 'bg-rose-700' },
  { id: 'ob19', name: 'Sagar Ratna', emoji: '🥘', color: 'bg-teal-600' },
  { id: 'ob20', name: 'Filter Coffee Co', emoji: '☕', color: 'bg-amber-800' },
];

export default function Onboarding({ onComplete }) {
  const [selected, setSelected] = useState(new Set());
  const [step, setStep] = useState(0); // 0 = welcome, 1 = picker

  const toggle = (id) => {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id); else next.add(id);
    setSelected(next);
  };

  const handleFinish = () => {
    localStorage.setItem('trucart_onboarded', 'true');
    migrateOnboardingToFavorites([...selected]);
    onComplete();
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ background: 'var(--bg)' }}>
      <AnimatePresence mode="wait">
        {step === 0 && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="glass-tile max-w-lg w-full p-8 md:p-12 rounded-3xl text-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center mx-auto mb-6">
                <Sparkles className="w-8 h-8 text-brand" />
              </div>
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3" style={{ color: 'var(--fg)' }}>
                Welcome to Tru<span className="text-brand">Cart</span>
              </h1>
              <p className="text-base mb-2" style={{ color: 'var(--fg-muted)' }}>
                The smartest way to compare prices before you buy.
              </p>
              <p className="text-sm mb-8" style={{ color: 'var(--fg-faint)' }}>
                Starting with food delivery — because everyone deserves the best deal on every order.
              </p>
              <button
                onClick={() => setStep(1)}
                className="bg-brand text-white px-8 py-4 rounded-xl font-semibold text-base transition-all active:scale-[0.97] shadow-md shadow-brand/15 inline-flex items-center gap-2 hover:bg-brand-dark"
              >
                Let's personalize your feed <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>
        )}

        {step === 1 && (
          <motion.div
            key="picker"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="max-w-3xl w-full"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight mb-2" style={{ color: 'var(--fg)' }}>
                Where do you love to order from?
              </h2>
              <p className="text-sm" style={{ color: 'var(--fg-faint)' }}>
                Select the ones you've eaten at or want to try. We'll personalize your experience.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {ONBOARDING_RESTAURANTS.map((r, i) => {
                const isSelected = selected.has(r.id);
                return (
                  <motion.button
                    key={r.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => toggle(r.id)}
                    className={`glass-tile p-4 rounded-2xl flex flex-col items-center gap-2 transition-all relative ${isSelected ? 'ring-2 ring-brand shadow-lg' : ''}`}
                  >
                    <span className="text-2xl">{r.emoji}</span>
                    <span className="text-xs font-bold text-center leading-tight" style={{ color: 'var(--fg-muted)' }}>{r.name}</span>
                    
                    {/* Checkmark */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-brand flex items-center justify-center shadow-md"
                        >
                          <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Soft color tint when selected */}
                    <div
                      className={`absolute inset-0 rounded-2xl ${r.color}`}
                      style={{ opacity: isSelected ? 0.08 : 0, transition: 'opacity 0.3s ease' }}
                    />
                  </motion.button>
                );
              })}
            </div>

            <div className="mt-8 flex justify-between items-center">
              <span className="text-sm font-medium" style={{ color: 'var(--fg-faint)' }}>
                {selected.size} selected
              </span>
              <button
                onClick={handleFinish}
                className="bg-brand text-white px-8 py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-[0.97] shadow-md shadow-brand/15 inline-flex items-center gap-2 hover:bg-brand-dark disabled:opacity-40"
              >
                {selected.size > 0 ? "Let's go!" : 'Skip for now'} <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
