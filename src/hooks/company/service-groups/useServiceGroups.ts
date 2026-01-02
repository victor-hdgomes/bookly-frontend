import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { ServiceGroupListResponse } from "@/types/service-group.types";
import { SERVICE_GROUPS_QUERY_KEYS, SERVICE_GROUPS_ENDPOINTS } from "@/constants";

export const useServiceGroups = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: [...SERVICE_GROUPS_QUERY_KEYS.SERVICE_GROUPS, page, limit],
    queryFn: async () => {
      const response = await api.get<ServiceGroupListResponse>(SERVICE_GROUPS_ENDPOINTS.LIST, {
        params: { page, limit },
      });
      return response.data;
    },
  });
};
