import { Card } from "@/components/ui/card";
import { isSameDay } from "date-fns";
import { DateButton } from "./DateButton";
import { NavigationButton } from "./NavigationButton";
import { useDateFormat } from "@/hooks";

interface DateScrollerProps {
  dates: Date[];
  selectedDate: Date | null;
  visibleMonth: Date;
  onSelectDate: (date: Date) => void;
  onScrollLeft: () => void;
  onScrollRight: () => void;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export function DateScroller({
  dates,
  selectedDate,
  visibleMonth,
  onSelectDate,
  onScrollLeft,
  onScrollRight,
  scrollRef,
}: DateScrollerProps) {
  const { formatMonthYear } = useDateFormat();

  return (
    <Card className="p-3 max-w-[300px] sm:max-w-lg md:max-w-full mx-auto">
      <div className="text-center">
        <h3 className="text-base font-semibold capitalize">
          {formatMonthYear(visibleMonth)}
        </h3>
      </div>
      
      <div className="relative">
        <NavigationButton direction="left" onClick={onScrollLeft} />

        <div 
          ref={scrollRef}
          className="overflow-x-auto scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <div className="flex gap-2 px-10">
            {dates.map((date) => (
              <DateButton
                key={date.toISOString()}
                date={date}
                isSelected={selectedDate ? isSameDay(date, selectedDate) : false}
                onSelect={onSelectDate}
              />
            ))}
          </div>
        </div>

        <NavigationButton direction="right" onClick={onScrollRight} />
      </div>
    </Card>
  );
}
