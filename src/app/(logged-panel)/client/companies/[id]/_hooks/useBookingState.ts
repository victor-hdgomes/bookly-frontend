import { useState } from "react";
import { Service } from "@/types/service-group.types";

export enum BookingStep {
  SERVICE = "service",
  PROFESSIONAL = "professional",
  DATE_TIME = "dateTime",
  CONFIRM = "confirm",
}

export function useBookingState() {
  const [currentStep, setCurrentStep] = useState<BookingStep>(BookingStep.SERVICE);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<string | null | undefined>(undefined);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const resetState = () => {
    setCurrentStep(BookingStep.SERVICE);
    setSelectedService(null);
    setSelectedEmployeeId("");
    setSelectedDate(null);
    setSelectedTime(null);
    setNotes("");
    setShowSuccess(false);
  };

  return {
    currentStep,
    setCurrentStep,
    selectedService,
    setSelectedService,
    selectedEmployeeId,
    setSelectedEmployeeId,
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    notes,
    setNotes,
    showSuccess,
    setShowSuccess,
    resetState,
  };
}
