import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { CreateServiceDto, Service } from "@/types/service-group.types";
import { SERVICES_QUERY_KEYS, SERVICE_GROUPS_QUERY_KEYS, SERVICES_ENDPOINTS } from "@/constants";

export const useCreateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateServiceDto) => {
      const response = await api.post<Service>(SERVICES_ENDPOINTS.CREATE, data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: SERVICES_QUERY_KEYS.SERVICES_BY_COMPANY(variables.companyId) });
      queryClient.invalidateQueries({ queryKey: SERVICE_GROUPS_QUERY_KEYS.SERVICE_GROUPS });
    },
  });
};
