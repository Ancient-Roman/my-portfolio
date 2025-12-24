import { useState, useEffect, useRef } from 'react';

/**
 * Custom hook to handle opacity changes based on scroll position
 * Useful for fade-in/fade-out effects on elements while scrolling
 * 
 * @param {number} scrollThreshold - Scroll position to start fading (default: 10)
 * @param {number} fadeDistance - Distance to fade out (default: 200)
 * @returns {Object} { opacity, ref } - opacity value and ref to attach to element
 */
export const useScrollFade = (scrollThreshold = 10, fadeDistance = 200) => {
  const [opacity, setOpacity] = useState(1);
  const elementRef = useRef(null);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;

      if (currentScroll <= scrollThreshold) {
        // Near top - fully visible
        setOpacity(1);
      } else if (currentScroll > lastScrollRef.current) {
        // Scrolling down - fade out
        setOpacity(0);
      } else if (currentScroll < lastScrollRef.current && currentScroll < fadeDistance) {
        // Scrolling up and within fade distance - fade in
        setOpacity(1);
      }

      lastScrollRef.current = currentScroll;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrollThreshold, fadeDistance]);

  return { opacity, ref: elementRef };
};

export default useScrollFade;
