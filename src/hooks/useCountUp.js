import { useState, useEffect } from 'react';

/**
 * Custom hook — animates a number counting up from 0 to `target`.
 * Uses ease-out cubic easing for a smooth, satisfying animation.
 *
 * @param {number} target  - The final number to count up to
 * @param {number} duration - Animation duration in ms (default 2000)
 * @returns {number} The current animated count value
 */
export function useCountUp(target, duration = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const startTime = Date.now();

    const tick = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [target, duration]);

  return count;
}
