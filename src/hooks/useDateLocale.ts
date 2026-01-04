import { useTranslation } from "react-i18next";
import { ptBR, enUS, es, de, fr, it } from "date-fns/locale";
import type { Locale } from "date-fns";

const localeMap: Record<string, Locale> = {
  pt: ptBR,
  en: enUS,
  es: es,
  de: de,
  fr: fr,
  it: it,
};

export function useDateLocale(): Locale {
  const { i18n } = useTranslation();
  return localeMap[i18n.language] || ptBR;
}
