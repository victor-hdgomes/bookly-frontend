import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TimeSlotButtonProps {
  time: string;
  isSelected: boolean;
  isAvailable: boolean;
  onSelect: (time: string) => void;
}

export function TimeSlotButton({ 
  time, 
  isSelected, 
  isAvailable, 
  onSelect 
}: TimeSlotButtonProps) {
  return (
    <Button
      variant={isSelected ? "default" : "outline"}
      className={cn(
        "h-9 text-sm font-semibold",
        !isAvailable && "opacity-40 cursor-not-allowed"
      )}
      disabled={!isAvailable}
      onClick={() => onSelect(time)}
    >
      {time}
    </Button>
  );
}
