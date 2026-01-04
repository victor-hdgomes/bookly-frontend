import { useMemo } from "react";

interface TimeSlot {
  time: string;
  available: boolean;
}

export function useFilteredTimeSlots(
  availableSlots: TimeSlot[] | undefined,
  selectedDate: Date | null
) {
  const filteredSlots = useMemo(() => {
    if (!availableSlots || !selectedDate) return availableSlots;

    const now = new Date();
    const isToday = 
      selectedDate.getDate() === now.getDate() &&
      selectedDate.getMonth() === now.getMonth() &&
      selectedDate.getFullYear() === now.getFullYear();

    if (!isToday) return availableSlots;

    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    return availableSlots.filter((slot) => {
      const [hour, minute] = slot.time.split(':').map(Number);
      return hour > currentHour || (hour === currentHour && minute > currentMinute);
    });
  }, [availableSlots, selectedDate]);

  const groupedSlots = useMemo(() => {
    if (!filteredSlots) return { morning: [], afternoon: [], evening: [] };

    const groups = {
      morning: [] as typeof filteredSlots,
      afternoon: [] as typeof filteredSlots,
      evening: [] as typeof filteredSlots,
    };

    filteredSlots.forEach((slot) => {
      const hour = parseInt(slot.time.split(':')[0]);
      if (hour < 12) {
        groups.morning.push(slot);
      } else if (hour < 18) {
        groups.afternoon.push(slot);
      } else {
        groups.evening.push(slot);
      }
    });

    return groups;
  }, [filteredSlots]);

  const hasSlots = filteredSlots && filteredSlots.length > 0;

  return {
    filteredSlots,
    groupedSlots,
    hasSlots: !!hasSlots,
  };
}
