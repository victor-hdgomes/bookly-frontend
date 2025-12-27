import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Sun, Moon } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="flex gap-2 items-center justify-center p-2">
      <Button
        variant={theme === "light" ? "default" : "ghost"}
        size="icon"
        aria-label="Tema claro"
        onClick={() => setTheme("light")}
      >
        <Sun className="w-5 h-5" />
      </Button>
      <Button
        variant={theme === "dark" ? "default" : "ghost"}
        size="icon"
        aria-label="Tema escuro"
        onClick={() => setTheme("dark")}
      >
        <Moon className="w-5 h-5" />
      </Button>
    </div>
  );
}
