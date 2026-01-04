import { useTranslation } from "react-i18next";
import { 
  formatLongDate, 
  formatShortDate, 
  formatMonthYear, 
  formatDayOfWeek,
  formatDayNumber,
  formatTime,
} from "@/lib/date-format-utils";

export function useDateFormat() {
  const { i18n } = useTranslation();
  const language = i18n.language;

  return {
    formatLongDate: (date: Date) => formatLongDate(date, language),
    formatShortDate: (date: Date) => formatShortDate(date, language),
    formatMonthYear: (date: Date) => formatMonthYear(date, language),
    formatDayOfWeek: (date: Date) => formatDayOfWeek(date, language),
    formatDayNumber,
    formatTime,
  };
}
