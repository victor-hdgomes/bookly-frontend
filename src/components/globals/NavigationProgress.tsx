"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export function NavigationProgress() {
  const pathname = usePathname();
  const [isNavigating, setIsNavigating] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;

    if (isNavigating) {
      setProgress(0);
      let currentProgress = 0;

      progressInterval = setInterval(() => {
        if (currentProgress < 90) {
          currentProgress += Math.random() * 10;
          setProgress(Math.min(currentProgress, 90));
        }
      }, 200);
    } else {
      setProgress(100);
      setTimeout(() => setProgress(0), 300);
    }

    return () => {
      if (progressInterval) clearInterval(progressInterval);
    };
  }, [isNavigating]);

  useEffect(() => {
    setIsNavigating(true);
    const timeout = setTimeout(() => setIsNavigating(false), 100);
    return () => clearTimeout(timeout);
  }, [pathname]);

  if (progress === 0 || progress === 100) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-primary transition-all duration-300 ease-out"
      style={{
        width: `${progress}%`,
        boxShadow: "0 0 10px rgba(var(--primary), 0.5)",
      }}
    />
  );
}
