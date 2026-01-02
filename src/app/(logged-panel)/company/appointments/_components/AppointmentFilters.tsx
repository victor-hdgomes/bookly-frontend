"use client";

import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SelectField } from "@/components/ui/select-field";
import { SearchInput } from "@/components/ui/search-input";
import { AppointmentStatus } from "@/types/appointment.types";
import { Service } from "@/types/service-group.types";
import { Employee } from "@/hooks/company/employees/useEmployees";

interface AppointmentFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedServiceId: string;
  onServiceChange: (value: string) => void;
  selectedUserId: string;
  onUserChange: (value: string) => void;
  selectedStatus: AppointmentStatus | "";
  onStatusChange: (value: AppointmentStatus | "") => void;
  services: Service[];
  employees: Employee[];
  onCreateNew: () => void;
  onClearFilters: () => void;
}

export function AppointmentFilters({
  searchQuery,
  onSearchChange,
  selectedServiceId,
  onServiceChange,
  selectedUserId,
  onUserChange,
  selectedStatus,
  onStatusChange,
  services,
  employees,
  onCreateNew,
  onClearFilters,
}: AppointmentFiltersProps) {
  const { t } = useTranslation("appointments");

  const hasActiveFilters =
    searchQuery || selectedServiceId || selectedUserId || selectedStatus;

  const handleServiceChange = (value: string) => {
    onServiceChange(value === "all" ? "" : value);
  };

  const handleUserChange = (value: string) => {
    onUserChange(value === "all" ? "" : value);
  };

  const handleStatusChange = (value: string) => {
    onStatusChange(value === "all" ? "" : (value as AppointmentStatus));
  };

  const serviceOptions = [
    { value: "all", label: t("filters.allServices") },
    ...services.map((service) => ({
      value: service.id,
      label: service.name,
    })),
  ];

  const employeeOptions = [
    { value: "all", label: t("filters.allEmployees") },
    ...employees.map((employee) => ({
      value: employee.userId,
      label:
        employee.user.displayName ||
        `${employee.user.firstName} ${employee.user.lastName}` ||
        employee.user.email,
    })),
  ];

  const statusOptions = [
    { value: "all", label: t("filters.allStatuses") },
    {
      value: AppointmentStatus.SCHEDULED,
      label: t("status.scheduled"),
    },
    {
      value: AppointmentStatus.COMPLETED,
      label: t("status.completed"),
    },
    {
      value: AppointmentStatus.CANCELED,
      label: t("status.canceled"),
    },
  ];

  return (
    <div className="space-y-4">
      <SearchInput
        value={searchQuery}
        onChange={onSearchChange}
        placeholder={t("filters.searchPlaceholder")}
        buttonLabel={t("filters.createButton")}
        onButtonClick={onCreateNew}
      />

      <div className="flex flex-col sm:flex-row gap-4">
          <SelectField
            value={selectedServiceId || "all"}
            onValueChange={handleServiceChange}
            options={serviceOptions}
            placeholder={t("filters.servicePlaceholder")}
          />
          <SelectField
            value={selectedUserId || "all"}
            onValueChange={handleUserChange}
            options={employeeOptions}
            placeholder={t("filters.employeePlaceholder")}
          />
          <SelectField
            value={selectedStatus || "all"}
            onValueChange={handleStatusChange}
            options={statusOptions}
            placeholder={t("filters.statusPlaceholder")}
          />

        {hasActiveFilters && (
          <Button variant="outline" onClick={onClearFilters}>
            <X className="h-4 w-4 mr-2" />
            {t("filters.clearFilters")}
          </Button>
        )}
      </div>
    </div>
  );
}
