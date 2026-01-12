import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction } from "react";
import { Service } from "@/types/service-group.types";
import { BookingStep } from "./useBookingState";

interface UseBookingNavigationProps {
  currentStep: BookingStep;
  setCurrentStep: (step: BookingStep) => void;
  setSelectedService: (service: Service | null) => void;
  setSelectedEmployeeId: Dispatch<SetStateAction<string | null>>;
  setSelectedDate: (date: Date | null) => void;
  setSelectedTime: (time: string | null) => void;
}

type BackNavigationConfig = {
  previousStep: BookingStep | "ROUTER_BACK";
  resetActions?: () => void;
};

export function useBookingNavigation({
  currentStep,
  setCurrentStep,
  setSelectedService,
  setSelectedEmployeeId,
  setSelectedDate,
  setSelectedTime,
}: UseBookingNavigationProps) {
  const router = useRouter();

  const BACK_NAVIGATION_MAP: Record<BookingStep, BackNavigationConfig> = {
    [BookingStep.SERVICE]: {
      previousStep: "ROUTER_BACK",
    },
    [BookingStep.PROFESSIONAL]: {
      previousStep: BookingStep.SERVICE,
      resetActions: () => setSelectedService(null),
    },
    [BookingStep.DATE_TIME]: {
      previousStep: BookingStep.PROFESSIONAL,
      resetActions: () => {
        setSelectedEmployeeId("");
        setSelectedDate(null);
        setSelectedTime(null);
      },
    },
    [BookingStep.CONFIRM]: {
      previousStep: BookingStep.DATE_TIME,
      resetActions: () => setSelectedTime(null),
    },
  };

  const handleStepChange = <T,>(
    value: T,
    setter: (value: T) => void,
    nextStep: BookingStep,
    additionalActions?: () => void
  ) => {
    setter(value);
    additionalActions?.();
    setCurrentStep(nextStep);
  };

  const handleBack = () => {
    const config = BACK_NAVIGATION_MAP[currentStep];
    
    if (config.previousStep === "ROUTER_BACK") {
      router.back();
      return;
    }

    config.resetActions?.();
    setCurrentStep(config.previousStep);
  };

  return {
    handleStepChange,
    setSelectedService,
    setSelectedEmployeeId,
    setSelectedDate,
    setSelectedTime,
    handleBack,
  };
}
