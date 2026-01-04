import { useRef, useState, useEffect } from "react";

export function useCalendarScroll(availableDates: Date[], itemWidth: number = 56) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [visibleMonth, setVisibleMonth] = useState(new Date());

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;
      
      const container = scrollRef.current;
      const containerWidth = container.offsetWidth;
      const scrollLeft = container.scrollLeft;
      
      const centerIndex = Math.round((scrollLeft + containerWidth / 2) / itemWidth);
      const visibleDate = availableDates[Math.min(centerIndex, availableDates.length - 1)];
      
      if (visibleDate) {
        setVisibleMonth(visibleDate);
      }
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => container.removeEventListener('scroll', handleScroll);
    }
  }, [availableDates, itemWidth]);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return {
    scrollRef,
    visibleMonth,
    scrollLeft,
    scrollRight,
  };
}
