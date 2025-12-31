"use client";

import { Palette } from "lucide-react";
import {
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "@/components/ui/dropdown-menu";
import { useTranslation } from "react-i18next";
import { useThemes } from "@/hooks/useThemes";

export function ThemeSubmenu() {
  const { t } = useTranslation("sidebar");
  const { themes, currentTheme, setTheme } = useThemes();

  return (
    <DropdownMenuSub>
      <DropdownMenuSubTrigger>
        <Palette className="mr-2 h-4 w-4" />
        <span>{t("theme")}</span>
      </DropdownMenuSubTrigger>
      <DropdownMenuSubContent>
        <DropdownMenuRadioGroup
          value={currentTheme}
          onValueChange={setTheme}
        >
          {themes.map((themeOption) => (
            <DropdownMenuRadioItem
              key={themeOption.value}
              value={themeOption.value}
            >
              {themeOption.label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuSubContent>
    </DropdownMenuSub>
  );
}

