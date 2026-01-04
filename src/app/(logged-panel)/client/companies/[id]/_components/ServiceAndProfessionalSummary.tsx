import { useTranslation } from "react-i18next";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Employee } from "@/hooks/company/employees/useEmployees";
import { Service } from "@/types/service-group.types";

interface ServiceAndProfessionalSummaryProps {
  employee: Employee | null;
  service: Service;
}

export function ServiceAndProfessionalSummary({
  employee,
  service,
}: ServiceAndProfessionalSummaryProps) {
  const { t } = useTranslation("booking");

  const getEmployeeName = () => {
    if (!employee) return t("professional.any");
    return (
      employee.user.displayName ||
      `${employee.user.firstName || ""} ${employee.user.lastName || ""}`.trim() ||
      employee.user.email
    );
  };

  const getEmployeeInitials = () => {
    if (!employee) return "?";
    return getEmployeeName().substring(0, 2).toUpperCase();
  };

  return (
    <div className="p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm text-muted-foreground">
            {t("confirm.professional")}
          </div>

          <div className="flex items-center gap-2 mt-1">
            <Avatar className="h-8 w-8">
              <AvatarImage src={employee?.user.photo || undefined} />
              <AvatarFallback className="text-xs">
                {getEmployeeInitials()}
              </AvatarFallback>
            </Avatar>
            <div className="font-semibold">{getEmployeeName()}</div>
          </div>
        </div>

        <div className="sm:text-right">
          <div className="text-sm text-muted-foreground">
            {t("confirm.service")}
          </div>
          <div className="font-semibold mt-1">{service.name}</div>
        </div>
      </div>
    </div>
  );
}
