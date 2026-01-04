"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export function NavigationProgress() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setIsNavigating(true);
    setProgress(20);

    let currentProgress = 20;
    const interval = setInterval(() => {
      if (currentProgress < 80) {
        currentProgress += Math.random() * 15;
        setProgress(Math.min(currentProgress, 80));
      }
    }, 150);

    const completeTimeout = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      setTimeout(() => {
        setIsNavigating(false);
        setProgress(0);
      }, 300);
    }, 800);

    return () => {
      clearInterval(interval);
      clearTimeout(completeTimeout);
    };
  }, [pathname, searchParams]);

  useEffect(() => {
    const handleLinkClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      
      if (link && link.href && !link.target && link.href.startsWith(window.location.origin)) {
        setIsNavigating(true);
        setProgress(10);
      }
    };

    document.addEventListener('click', handleLinkClick);

    return () => {
      document.removeEventListener('click', handleLinkClick);
    };
  }, []);

  if (!isNavigating || progress === 0) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-primary via-primary/80 to-primary transition-all duration-200 ease-out"
      style={{
        width: `${progress}%`,
        boxShadow: "0 0 10px rgba(59, 130, 246, 0.5)",
      }}
    />
  );
}