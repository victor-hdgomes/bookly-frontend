import { Employee } from "@/hooks/company/employees/useEmployees";

export function getEmployeeInitials(employee: Employee): string {
  const name = employee.user.displayName || employee.user.firstName || employee.user.email;
  return name.substring(0, 2).toUpperCase();
}

export function getEmployeeDisplayName(employee: Employee): string {
  return employee.user.displayName || 
         `${employee.user.firstName || ''} ${employee.user.lastName || ''}`.trim() || 
         employee.user.email;
}
