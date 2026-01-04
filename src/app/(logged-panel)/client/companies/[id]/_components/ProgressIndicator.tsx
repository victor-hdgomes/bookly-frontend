import { cn } from "@/lib/utils";
import { BookingStep } from "../_hooks/useBookingState";

interface ProgressIndicatorProps {
  currentStep: BookingStep;
}

const STEPS: BookingStep[] = [
  BookingStep.SERVICE,
  BookingStep.PROFESSIONAL,
  BookingStep.DATE_TIME,
  BookingStep.CONFIRM,
];

export function ProgressIndicator({ currentStep }: ProgressIndicatorProps) {
  const stepIndex = STEPS.indexOf(currentStep);

  return (
    <div className="flex gap-1">
      {STEPS.map((step, index) => {
        const isActive = index === stepIndex;
        const isCompleted = index < stepIndex;

        return (
          <div
            key={step}
            className={cn(
              "h-1 flex-1 rounded-full transition-all",
              isCompleted && "bg-primary",
              isActive && "bg-primary",
              !isCompleted && !isActive && "bg-muted"
            )}
          />
        );
      })}
    </div>
  );
}
