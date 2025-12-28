"use client";
import { useTranslation } from "react-i18next";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  className?: string;
  collapsed?: boolean;
}

export function LanguageSwitcher({ className, collapsed }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation('sidebar');
  const languageLabels: Record<string, string> = {
    pt: 'Português',
    en: 'English',
    es: 'Español',
    it: 'Italiano',
    fr: 'Français',
    de: 'Deutsch',
  };
  const languages = Object.keys(i18n.options.resources || {}).filter(l => languageLabels[l]);

  if (collapsed) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
        <label className="text-xs font-semibold uppercase mb-1">{t('language')}</label>

      <Select value={i18n.language} onValueChange={i18n.changeLanguage}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map(lang => (
            <SelectItem key={lang} value={lang}>{languageLabels[lang]}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
