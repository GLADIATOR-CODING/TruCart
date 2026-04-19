import { motion } from 'framer-motion';
import { Star, Clock } from 'lucide-react';

/**
 * Reusable restaurant Card used in SearchPage and Dashboard.
 */
export default function RestaurantCard({ restaurant, onClick, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.5 }}
      onClick={onClick}
      className="glass-tile tilt-hover cursor-pointer group flex flex-col overflow-hidden"
    >
      <div className="aspect-4/3 overflow-hidden relative">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=60&w=500'; }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-[#f0ede6] via-transparent to-transparent opacity-70" />
        <div className="absolute bottom-2 left-2 glass-tile px-2 py-1 rounded-lg flex items-center gap-1 shadow-sm!">
          <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
          <span className="text-xs font-bold" style={{ color: 'var(--fg)' }}>{restaurant.rating}</span>
        </div>
      </div>
      <div className="p-3 flex-1 flex flex-col justify-between relative z-10">
        <div>
          <h3 className="text-sm font-bold truncate" style={{ color: 'var(--fg)' }}>{restaurant.name}</h3>
          <p className="text-[11px] truncate mt-0.5" style={{ color: 'var(--fg-faint)' }}>{restaurant.cuisine}</p>
        </div>
        <div className="flex justify-between items-end mt-3 pt-2" style={{ borderTop: '1px solid rgba(0,0,0,0.04)' }}>
          <div className="flex items-center text-[10px] font-medium" style={{ color: 'var(--fg-faint)' }}>
            <Clock className="w-3 h-3 mr-1" /> {restaurant.deliveryTime}
          </div>
          <div className="text-right">
            <span className="text-[10px] block" style={{ color: 'var(--fg-faint)' }}>from</span>
            <span className="text-sm font-bold text-brand">₹{restaurant.startsFrom}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
