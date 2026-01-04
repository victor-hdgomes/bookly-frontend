import { Service, ServiceGroup } from "@/types/service-group.types";
import { ServiceCard } from "./ServiceCard";

interface ServiceGroupSectionProps {
  group: ServiceGroup;
  selectedServiceId: string | null;
  onSelectService: (service: Service) => void;
}

export function ServiceGroupSection({ 
  group, 
  selectedServiceId, 
  onSelectService 
}: ServiceGroupSectionProps) {
  const activeServices = group.services.filter(s => s.isActive);
  
  if (activeServices.length === 0) return null;

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-muted-foreground px-1">
        {group.name}
      </h3>
      {activeServices.map((service) => (
        <ServiceCard
          key={service.id}
          service={service}
          isSelected={selectedServiceId === service.id}
          onSelect={onSelectService}
        />
      ))}
    </div>
  );
}
