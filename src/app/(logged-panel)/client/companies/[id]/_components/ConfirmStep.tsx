"use client";

import { Service } from "@/types/service-group.types";
import { Employee } from "@/hooks/company/employees/useEmployees";
import { useTranslation } from "react-i18next";
import { BookingSummaryCard } from "./BookingSummaryCard";
import { NotesSection } from "./NotesSection";
import { ConfirmButton } from "./ConfirmButton";

interface ConfirmStepProps {
  service: Service;
  employee: Employee | null;
  date: Date;
  time: string;
  notes: string;
  onNotesChange: (notes: string) => void;
  onConfirm: () => void;
  isLoading: boolean;
}

export function ConfirmStep({
  service,
  employee,
  date,
  time,
  notes,
  onNotesChange,
  onConfirm,
  isLoading,
}: ConfirmStepProps) {
  const { t } = useTranslation("booking");

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">{t("confirm.title")}</h2>
      </div>

      <BookingSummaryCard 
        service={service}
        employee={employee}
        date={date}
        time={time}
      />

      <NotesSection 
        notes={notes}
        onNotesChange={onNotesChange}
      />

      <ConfirmButton 
        onConfirm={onConfirm}
        isLoading={isLoading}
      />
    </div>
  );
}
