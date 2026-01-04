import { format as dateFnsFormat } from "date-fns";
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

export const getLocale = (language: string): Locale => {
  return localeMap[language] || ptBR;
};

export const formatWithLocale = (
  date: Date,
  formatStr: string,
  language: string
): string => {
  return dateFnsFormat(date, formatStr, { locale: getLocale(language) });
};

export const formatLongDate = (date: Date, language: string): string => {
  return formatWithLocale(date, "PPPP", language);
};

export const formatShortDate = (date: Date, language: string): string => {
  return formatWithLocale(date, "P", language);
};

export const formatMonthYear = (date: Date, language: string): string => {
  return formatWithLocale(date, "MMMM yyyy", language);
};

export const formatDayOfWeek = (date: Date, language: string): string => {
  return formatWithLocale(date, "EEE", language);
};

export const formatDayNumber = (date: Date): string => {
  return dateFnsFormat(date, "d");
};

export const formatTime = (date: Date): string => {
  return dateFnsFormat(date, "HH:mm");
};
