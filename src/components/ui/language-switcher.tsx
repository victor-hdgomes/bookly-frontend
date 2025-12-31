"use client";
import { useTranslation } from "react-i18next";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { useLanguages } from "@/hooks/useLanguages";

interface LanguageSwitcherProps {
  className?: string;
  collapsed?: boolean;
}

export function LanguageSwitcher({ className, collapsed }: LanguageSwitcherProps) {
  const { t } = useTranslation('sidebar');
  const { languages, currentLanguage, changeLanguage } = useLanguages();

  if (collapsed) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label className="text-xs font-semibold uppercase mb-1">{t('language')}</label>
      <Select value={currentLanguage} onValueChange={changeLanguage}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {languages.map(lang => (
            <SelectItem key={lang.code} value={lang.code}>{lang.name}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
