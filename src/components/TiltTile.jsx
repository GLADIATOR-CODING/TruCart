import { useState, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

/**
 * A 3D-tilt interactive tile component with glassmorphic styling.
 * Used on the Home page for food category navigation.
 */
export default function TiltTile({ tile, onClick, delay = 0 }) {
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
    <motion.button
      ref={ref}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="glass-tile aspect-square sm:aspect-[1.4/1] md:aspect-[1.6/1] rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer w-full p-2 outline-none focus-visible:ring-2 focus-visible:ring-brand"
      style={{ perspective: '600px', transformStyle: 'preserve-3d' }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setIsHovered(false); }}
      onClick={onClick}
      aria-label={`Search for ${tile.label}`}
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
    </motion.button>
  );
}
