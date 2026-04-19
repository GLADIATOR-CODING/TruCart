import { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Star, Clock, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { RESTAURANTS, getMenuItemsForRestaurant } from '../data/mockDatabase';
import Navbar from '../components/Navbar';
import MenuItem from '../components/MenuItem';
import { useFavorites } from '../context/FavoritesContext';

export default function RestaurantPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedItem, setSelectedItem] = useState(null);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();

  const isFav = isFavorite(id);

  const toggleFavorite = useCallback(() => {
    if (isFav) {
      removeFavorite(id);
    } else {
      addFavorite(id);
    }
  }, [isFav, id, addFavorite, removeFavorite]);

  const restaurant = RESTAURANTS.find(r => r.id === id);
  const menuItems = getMenuItemsForRestaurant(id);

  if (!restaurant) return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--bg)' }}>
      <div className="glass-tile p-8 rounded-2xl text-center">
        <div className="text-5xl mb-3">🍽️</div>
        <p className="font-bold text-lg mb-2" style={{ color: 'var(--fg)' }}>Restaurant not found</p>
        <button onClick={() => navigate('/')} className="text-brand font-semibold text-sm hover:underline">Go home</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-20" style={{ background: 'var(--bg)' }}>
      <Navbar />
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
