"use client";

import { useTranslation } from "react-i18next";
import { DateScroller } from "./DateScroller";
import { TimeSlotsSection } from "./TimeSlotsSection";
import { useCalendarDates } from "../_hooks/useCalendarDates";
import { useCalendarScroll } from "../_hooks/useCalendarScroll";
import { useFilteredTimeSlots } from "../_hooks/useFilteredTimeSlots";

interface DateTimeStepProps {
  availableSlots: Array<{ time: string; available: boolean }>;
  isLoadingSlots: boolean;
  selectedDate: Date | null;
  selectedTime: string | null;
  onSelectDate: (date: Date) => void;
  onSelectTime: (time: string) => void;
}

export function DateTimeStep({
  availableSlots,
  isLoadingSlots,
  selectedDate,
  selectedTime,
  onSelectDate,
  onSelectTime,
}: DateTimeStepProps) {
  const { t } = useTranslation("booking");
  
  const availableDates = useCalendarDates(30);
  const { scrollRef, visibleMonth, scrollLeft, scrollRight } = useCalendarScroll(availableDates);
  const { groupedSlots, hasSlots } = useFilteredTimeSlots(availableSlots, selectedDate);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">{t("dateTime.title")}</h2>
      </div>

      <DateScroller
        dates={availableDates}
        selectedDate={selectedDate}
        visibleMonth={visibleMonth}
        onSelectDate={onSelectDate}
        onScrollLeft={scrollLeft}
        onScrollRight={scrollRight}
        scrollRef={scrollRef}
      />

      {selectedDate && (
        <TimeSlotsSection
          selectedDate={selectedDate}
          isLoadingSlots={isLoadingSlots}
          groupedSlots={groupedSlots}
          selectedTime={selectedTime}
          onSelectTime={onSelectTime}
          hasSlots={hasSlots}
        />
      )}
    </div>
  );
}
