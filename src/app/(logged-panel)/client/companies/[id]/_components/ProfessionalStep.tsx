"use client";

import { Employee } from "@/hooks/company/employees/useEmployees";
import { useTranslation } from "react-i18next";
import { ProfessionalCard } from "./ProfessionalCard";
import { AnyProfessionalCard } from "./AnyProfessionalCard";
import { EmptyProfessionals } from "./EmptyProfessionals";

interface ProfessionalStepProps {
  employees: Employee[];
  selectedEmployeeId: string | null | undefined;
  onSelectEmployee: (employeeId: string | null) => void;
}

export function ProfessionalStep({ 
  employees, 
  selectedEmployeeId, 
  onSelectEmployee 
}: ProfessionalStepProps) {
  const { t } = useTranslation("booking");

  const activeEmployees = employees.filter(emp => emp.isActive);

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold">{t("professional.title")}</h2>
      </div>

      <div className="grid gap-3">
        <AnyProfessionalCard 
          isSelected={selectedEmployeeId === null}
          onSelect={() => onSelectEmployee(null)}
        />

        {activeEmployees.length === 0 ? (
          <EmptyProfessionals />
        ) : (
          activeEmployees.map((employee) => (
            <ProfessionalCard
              key={employee.id}
              employee={employee}
              isSelected={selectedEmployeeId === employee.id}
              onSelect={() => onSelectEmployee(employee.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
