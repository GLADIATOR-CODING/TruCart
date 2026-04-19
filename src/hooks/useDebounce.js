import { useState, useEffect } from 'react';

/**
 * Custom hook — debounces a rapidly-changing value.
 * Useful for search inputs to avoid re-filtering on every keystroke.
 *
 * @param {*} value - The value to debounce
 * @param {number} delay - Delay in ms (default 300)
 * @returns {*} The debounced value
 */
export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debounced;
}
