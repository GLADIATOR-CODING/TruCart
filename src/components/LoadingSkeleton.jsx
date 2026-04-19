import { motion } from 'framer-motion';

/**
 * Pulsing skeleton loader matching the app's glassmorphic design.
 * Used as Suspense fallback and during data loading.
 */
export default function LoadingSkeleton({ type = 'page' }) {
  if (type === 'cards') {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="glass-tile rounded-2xl overflow-hidden">
            <div className="aspect-4/3 skeleton-pulse" />
            <div className="p-3 space-y-2">
              <div className="h-4 w-3/4 rounded skeleton-pulse" />
              <div className="h-3 w-1/2 rounded skeleton-pulse" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 p-8" style={{ background: 'var(--bg)' }}>
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        className="w-12 h-12 rounded-2xl bg-brand/10 flex items-center justify-center"
      >
        <div className="w-6 h-6 rounded-lg bg-brand/30" />
      </motion.div>
      <div className="space-y-3 text-center">
        <div className="h-5 w-32 mx-auto rounded-lg skeleton-pulse" />
        <div className="h-3 w-48 mx-auto rounded skeleton-pulse" />
      </div>
    </div>
  );
}
