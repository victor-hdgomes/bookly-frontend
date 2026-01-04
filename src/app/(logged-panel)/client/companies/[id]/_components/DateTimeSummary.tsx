import { useTranslation } from "react-i18next";
import { Calendar, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface DateTimeSummaryProps {
  date: Date;
  time: string;
}

export function DateTimeSummary({ date, time }: DateTimeSummaryProps) {
  const { t } = useTranslation("booking");

  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="text-sm text-muted-foreground">
              {t("confirm.date")}
            </div>
            <div className="font-semibold">
              {format(date, "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <div>
            <div className="text-sm text-muted-foreground">
              {t("confirm.time")}
            </div>
            <div className="font-semibold">{time}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
