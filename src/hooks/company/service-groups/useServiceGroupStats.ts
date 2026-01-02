import { useMemo } from "react";
import { ServiceGroup } from "@/types/service-group.types";

interface ServiceGroupStats {
  totalServices: number;
  avgPrice: number;
  avgDuration: number;
}

export const useServiceGroupStats = (serviceGroup: ServiceGroup): ServiceGroupStats => {
  return useMemo(() => {
    const totalServices = serviceGroup.services.length;
    const avgPrice = totalServices > 0
      ? serviceGroup.services.reduce((sum, s) => sum + s.price, 0) / totalServices
      : 0;
    const avgDuration = totalServices > 0
      ? serviceGroup.services.reduce((sum, s) => sum + s.duration, 0) / totalServices
      : 0;

    return {
      totalServices,
      avgPrice,
      avgDuration,
    };
  }, [serviceGroup.services]);
};
