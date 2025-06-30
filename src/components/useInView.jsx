import { useEffect, useRef, useState } from 'react';

/**
 * Standard useInView hook using Intersection Observer API
 * Follows industry best practices and React conventions
 */
const useInView = ({
  threshold = 0.1,
  rootMargin = '100px',
  triggerOnce = false,
  enabled = true
} = {}) => {
  const elementRef = useRef(null);
  const [isInView, setIsInView] = useState(false);
  const [hasBeenInView, setHasBeenInView] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element || !enabled) return;

    // Skip if triggerOnce and already triggered
    if (triggerOnce && hasBeenInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const inView = entry.isIntersecting;
        setIsInView(inView);
        
        if (inView && !hasBeenInView) {
          setHasBeenInView(true);
        }
      },
      {
        threshold,
        rootMargin,
        root: null
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, hasBeenInView, enabled]);

  return {
    ref: elementRef,
    isInView,
    hasBeenInView
  };
};

export default useInView;