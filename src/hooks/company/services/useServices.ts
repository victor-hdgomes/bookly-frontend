import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { Service } from "@/types/service-group.types";
import { SERVICES_QUERY_KEYS, SERVICES_ENDPOINTS } from "@/constants";

export const useServices = (companyId: string | undefined, enabled = true) => {
  return useQuery({
    queryKey: SERVICES_QUERY_KEYS.SERVICES_BY_COMPANY(companyId || ''),
    queryFn: async () => {
      if (!companyId) return [];
      const response = await api.get<Service[]>(SERVICES_ENDPOINTS.LIST_BY_COMPANY(companyId));
      return response.data;
    },
    enabled: enabled && !!companyId,
  });
};
