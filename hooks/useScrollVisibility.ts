import { useState, useEffect, useCallback } from 'react';
import { useMediaQuery } from 'usehooks-ts';

const HIDE_DELAY_MS = 2000;

interface ScrollVisibilityResult {
  isVisible: boolean;
  isLoading: boolean;
  isDesktop: boolean;
}

/**
 * A hook that manages visibility of UI elements based on scroll direction and screen size.
 * - On desktop: Element remains visible
 * - On mobile: Element hides after inactivity and shows on scroll up
 * 
 * @returns {ScrollVisibilityResult} Object containing visibility states
 */
export const useScrollVisibility = (): ScrollVisibilityResult => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hideTimeout, setHideTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Initialize loading state
  useEffect(() => {
    setIsLoading(false);
    
    if (!isDesktop) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, HIDE_DELAY_MS);
      
      return () => {
        clearTimeout(timer);
        setIsLoading(true);
      };
    }
    
    return () => setIsLoading(true);
  }, [isDesktop]);

  // Memoized scroll handler
  const handleScrollDirection = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    if (!isDesktop) {
      // Clear existing timeout
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }

      // Show on scroll up, hide on scroll down
      if (currentScrollY < lastScrollY) {
        setIsVisible(true);
        const timeout = setTimeout(() => {
          setIsVisible(false);
        }, HIDE_DELAY_MS);
        setHideTimeout(timeout);
      } else if (currentScrollY > lastScrollY) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    }
  }, [isDesktop, lastScrollY, hideTimeout]);

  // Attach scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScrollDirection);
    
    return () => {
      window.removeEventListener("scroll", handleScrollDirection);
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [handleScrollDirection, hideTimeout]);

  return {
    isVisible,
    isLoading,
    isDesktop
  };
};
