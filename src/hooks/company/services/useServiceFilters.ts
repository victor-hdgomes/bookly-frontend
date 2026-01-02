import { useMemo } from "react";
import { Service } from "@/types/service-group.types";

interface UseServiceFiltersProps {
  services: Service[];
  searchQuery: string;
  selectedGroupId: string;
  showInactive: boolean;
}

export function useServiceFilters({
  services,
  searchQuery,
  selectedGroupId,
  showInactive,
}: UseServiceFiltersProps) {
  return useMemo(() => {
    return services.filter((service) => {
      if (selectedGroupId && service.serviceGroupId !== selectedGroupId) {
        return false;
      }

      if (!showInactive && !service.isActive) {
        return false;
      }

      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = service.name.toLowerCase().includes(query);
        const matchesGroup = service.serviceGroup?.name.toLowerCase().includes(query);
        const matchesPrice = service.price.toString().includes(query);
        
        return matchesName || matchesGroup || matchesPrice;
      }

      return true;
    });
  }, [services, searchQuery, selectedGroupId, showInactive]);
}
