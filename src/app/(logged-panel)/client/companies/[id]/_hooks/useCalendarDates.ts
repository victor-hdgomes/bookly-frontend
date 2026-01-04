import { useMemo } from "react";
import { addDays } from "date-fns";

export function useCalendarDates(numberOfDays: number = 30) {
  return useMemo(() => {
    const dates = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    for (let i = 0; i < numberOfDays; i++) {
      dates.push(addDays(today, i));
    }
    return dates;
  }, [numberOfDays]);
}
