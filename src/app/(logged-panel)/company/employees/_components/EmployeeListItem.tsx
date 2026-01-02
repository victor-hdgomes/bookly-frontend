"use client";

import { Employee } from "@/hooks/company/employees";
import { Badge } from "@/components/ui/badge";
import { ListItem } from "@/components/globals";

interface EmployeeListItemProps {
  employee: Employee;
  onDelete: (employeeId: string) => void;
}

export function EmployeeListItem({ employee, onDelete }: EmployeeListItemProps) {
  const displayName = employee.user.displayName || 
    `${employee.user.firstName} ${employee.user.lastName}`;
  
  const avatarFallback = `${employee.user.firstName?.[0] || ''}${employee.user.lastName?.[0] || ''}`;

  return (
    <ListItem
      isActive={employee.isActive}
      title={displayName}
      subtitle={employee.user.email}
      avatar={{
        src: employee.user.photo,
        fallback: avatarFallback,
      }}
      badges={
        employee.position ? (
          <Badge variant="secondary">{employee.position}</Badge>
        ) : null
      }
      onDelete={() => onDelete(employee.id)}
      className="p-4"
    />
  );
}
