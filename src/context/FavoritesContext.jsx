import { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useAuth } from './AuthContext';
import {
  addUserFavorite,
  removeUserFavorite,
  onFavoritesChange,
} from '../services/firestore';
import { RESTAURANTS } from '../data/mockDatabase';

const FavoritesContext = createContext(null);

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}

export function FavoritesProvider({ children }) {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [loading, setLoading] = useState(true);

  // Real-time Firestore listener for favorites
  useEffect(() => {
    if (!user) {
      setFavoriteIds([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    const unsubscribe = onFavoritesChange(user.uid, (ids) => {
      setFavoriteIds(ids);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  const addFavorite = useCallback(async (restaurantId) => {
    if (!user) return;
    // Optimistic update
    setFavoriteIds(prev => [...prev, restaurantId]);
    try {
      await addUserFavorite(user.uid, restaurantId);
    } catch (err) {
      // Rollback on failure
      setFavoriteIds(prev => prev.filter(id => id !== restaurantId));
      console.error('Failed to add favorite:', err);
    }
  }, [user]);

  const removeFavorite = useCallback(async (restaurantId) => {
    if (!user) return;
    // Optimistic update
    setFavoriteIds(prev => prev.filter(id => id !== restaurantId));
    try {
      await removeUserFavorite(user.uid, restaurantId);
    } catch (err) {
      // Rollback on failure
      setFavoriteIds(prev => [...prev, restaurantId]);
      console.error('Failed to remove favorite:', err);
    }
  }, [user]);

  const isFavorite = useCallback((restaurantId) => {
    return favoriteIds.includes(restaurantId);
  }, [favoriteIds]);

  // Get full restaurant objects for favorite IDs
  const favoriteRestaurants = RESTAURANTS.filter(r => favoriteIds.includes(r.id));

  const value = useMemo(() => ({
    favoriteIds,
    favoriteRestaurants,
    loading,
    addFavorite,
    removeFavorite,
    isFavorite,
  }), [favoriteIds, favoriteRestaurants, loading, addFavorite, removeFavorite, isFavorite]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}
