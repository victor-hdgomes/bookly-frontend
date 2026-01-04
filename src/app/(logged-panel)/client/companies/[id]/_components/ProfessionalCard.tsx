import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Employee } from "@/hooks/company/employees/useEmployees";
import { getEmployeeDisplayName, getEmployeeInitials } from "../_utils/employeeUtils";

interface ProfessionalCardProps {
  employee: Employee;
  isSelected: boolean;
  onSelect: (employeeId: string) => void;
}

export function ProfessionalCard({ employee, isSelected, onSelect }: ProfessionalCardProps) {
  const displayName = getEmployeeDisplayName(employee);

  return (
    <Card
      className={cn(
        "p-4 cursor-pointer transition-all hover:shadow-md active:scale-[0.98]",
        isSelected && "ring-2 ring-primary bg-primary/5"
      )}
      onClick={() => onSelect(employee.id)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={employee.user.photo || undefined} alt={displayName} />
            <AvatarFallback>{getEmployeeInitials(employee)}</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-semibold">{displayName}</h4>
            {employee.position && (
              <p className="text-sm text-muted-foreground">{employee.position}</p>
            )}
          </div>
        </div>
        <ChevronRight className={cn(
          "h-5 w-5 transition-colors",
          isSelected ? "text-primary" : "text-muted-foreground"
        )} />
      </div>
    </Card>
  );
}
