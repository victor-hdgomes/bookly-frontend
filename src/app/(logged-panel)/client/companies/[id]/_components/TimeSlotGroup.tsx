import { TimeSlotButton } from "./TimeSlotButton";

interface TimeSlotGroupProps {
  label: string;
  slots: Array<{ time: string; available: boolean }>;
  selectedTime: string | null;
  onSelectTime: (time: string) => void;
}

export function TimeSlotGroup({ 
  label, 
  slots, 
  selectedTime, 
  onSelectTime 
}: TimeSlotGroupProps) {
  if (slots.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="text-sm font-semibold text-muted-foreground px-1">{label}</h4>
      <div className="grid grid-cols-2 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2">
        {slots.map((slot) => (
          <TimeSlotButton
            key={slot.time}
            time={slot.time}
            isSelected={selectedTime === slot.time}
            isAvailable={slot.available}
            onSelect={onSelectTime}
          />
        ))}
      </div>
    </div>
  );
}
