import { isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { useDateFormat } from "@/hooks";

interface DateButtonProps {
  date: Date;
  isSelected: boolean;
  onSelect: (date: Date) => void;
}

export function DateButton({ date, isSelected, onSelect }: DateButtonProps) {
  const isCurrentDay = isToday(date);
  const { formatDayOfWeek, formatDayNumber } = useDateFormat();
  
  return (
    <button
      onClick={() => onSelect(date)}
      className={cn(
        "flex flex-col items-center justify-center min-w-[38px] sm:min-w-[48px] p-1 sm:p-1.5 rounded-md border transition-all flex-shrink-0 cursor-pointer",
        isSelected 
          ? "bg-primary text-primary-foreground border-primary shadow-md" 
          : isCurrentDay
          ? "bg-accent border-accent font-semibold"
          : "bg-background border-border hover:border-primary/50"
      )}
    >
      <span className="text-[7px] sm:text-[9px] font-medium uppercase leading-tight">
        {formatDayOfWeek(date)}
      </span>
      <span className="text-sm sm:text-lg font-bold leading-tight">
        {formatDayNumber(date)}
      </span>
    </button>
  );
}
