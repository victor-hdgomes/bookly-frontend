import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ThemeSwitcherProps {
  compact?: boolean;
}

export function ThemeSwitcher({ compact }: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();

  return (
    <div className={cn(
      "gap-2 items-center justify-center transition-all",
      compact ? "flex flex-col p-0 w-10" : "flex p-2"
    )}>
      <Button
        variant={theme === "light" ? "default" : "ghost"}
        size="icon"
        aria-label="Tema claro"
        onClick={() => setTheme("light")}
        className={compact ? "w-8 h-8" : undefined}
      >
        <Sun className="w-5 h-5" />
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "ghost"}
        size="icon"
        aria-label="Tema escuro"
        onClick={() => setTheme("dark")}
        className={compact ? "w-8 h-8" : undefined}
      >
        <Moon className="w-5 h-5" />
      </Button>
    </div>
  );
}
