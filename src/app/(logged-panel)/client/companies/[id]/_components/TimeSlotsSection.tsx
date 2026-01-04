import { useTranslation } from "react-i18next";
import { Loader2 } from "lucide-react";
import { useDateFormat } from "@/hooks";
import { TimeSlotGroup } from "./TimeSlotGroup";

interface TimeSlotsSectionProps {
  selectedDate: Date;
  isLoadingSlots: boolean;
  groupedSlots: {
    morning: Array<{ time: string; available: boolean }>;
    afternoon: Array<{ time: string; available: boolean }>;
    evening: Array<{ time: string; available: boolean }>;
  };
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
  hasSlots: boolean;
}

export function TimeSlotsSection({
  selectedDate,
  isLoadingSlots,
  groupedSlots,
  selectedTime,
  onSelectTime,
  hasSlots,
}: TimeSlotsSectionProps) {
  const { t } = useTranslation("booking");
  const { formatLongDate } = useDateFormat();

  const SLOT_PERIODS = [
    { key: "morning", labelKey: "dateTime.morning" },
    { key: "afternoon", labelKey: "dateTime.afternoon" },
    { key: "evening", labelKey: "dateTime.evening" },
  ] as const;

  return (
    <div className="space-y-4">
      <h3 className="font-semibold text-center">
        {formatLongDate(selectedDate)}
      </h3>

      {isLoadingSlots ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : hasSlots ? (
        <div className="space-y-4">
          {SLOT_PERIODS.map(({ key, labelKey }) => (
            <TimeSlotGroup
              key={key}
              label={t(labelKey)}
              slots={groupedSlots[key]}
              selectedTime={selectedTime}
              onSelectTime={onSelectTime}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-muted-foreground">
          {t("dateTime.noAvailableTimes")}
        </div>
      )}
    </div>
  );
}
