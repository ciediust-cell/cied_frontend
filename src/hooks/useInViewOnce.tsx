import { useEffect, useRef, useState } from "react";

export function useInViewOnce<T extends HTMLElement>(
  options: IntersectionObserverInit = { threshold: 0.3 }
): [React.RefObject<T | null>, boolean] {
  const ref = useRef<T | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);

    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [options]);

  return [ref, isVisible];
}
