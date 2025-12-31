"use client";

import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

interface ThemeSwitcherProps {
  compact?: boolean;
}

export function ThemeSwitcher({ compact }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div 
      className={cn(
        "gap-2 items-center justify-center transition-all",
        compact ? "flex flex-col p-0 w-10" : "flex p-2"
      )}
      suppressHydrationWarning
    >
      <Button
        variant={mounted ? (theme === "light" ? "default" : "ghost") : "ghost"}
        size="icon"
        aria-label="Tema claro"
        onClick={() => setTheme("light")}
        className={compact ? "w-8 h-8" : undefined}
        suppressHydrationWarning
      >
        <Sun className="w-5 h-5" />
      </Button>
      <Button
        variant={mounted ? (theme === "dark" ? "default" : "ghost") : "ghost"}
        size="icon"
        aria-label="Tema escuro"
        onClick={() => setTheme("dark")}
        className={compact ? "w-8 h-8" : undefined}
        suppressHydrationWarning
      >
        <Moon className="w-5 h-5" />
      </Button>
    </div>
  );
}
