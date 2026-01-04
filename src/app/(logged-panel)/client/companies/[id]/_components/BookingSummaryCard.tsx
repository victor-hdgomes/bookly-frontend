import { Card } from "@/components/ui/card";
import { Service } from "@/types/service-group.types";
import { Employee } from "@/hooks/company/employees/useEmployees";
import { ServiceAndProfessionalSummary } from "./ServiceAndProfessionalSummary";
import { DateTimeSummary } from "./DateTimeSummary";
import { PricingSummary } from "./PricingSummary";

interface BookingSummaryCardProps {
  service: Service;
  employee: Employee | null;
  date: Date;
  time: string;
}

export function BookingSummaryCard({ 
  service, 
  employee, 
  date, 
  time 
}: BookingSummaryCardProps) {
  return (
    <Card className="divide-y gap-0 py-0">
      <ServiceAndProfessionalSummary service={service} employee={employee} />
      <DateTimeSummary date={date} time={time} />
      <PricingSummary service={service} />
    </Card>
  );
}
