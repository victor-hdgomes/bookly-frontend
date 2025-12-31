import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";

export interface ThemeOption {
  value: string;
  label: string;
}

export const useThemes = () => {
  const { theme, setTheme } = useTheme();
  const { t } = useTranslation("sidebar");

  const themes: ThemeOption[] = [
    { value: "light", label: t("light") },
    { value: "dark", label: t("dark") },
    { value: "system", label: t("system") },
  ];

  return {
    themes,
    currentTheme: theme,
    setTheme,
  };
};

