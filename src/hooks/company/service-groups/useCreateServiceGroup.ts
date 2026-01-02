import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { CreateServiceGroupDto, ServiceGroup } from "@/types/service-group.types";
import { SERVICE_GROUPS_QUERY_KEYS, SERVICE_GROUPS_ENDPOINTS } from "@/constants";

export const useCreateServiceGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateServiceGroupDto) => {
      const response = await api.post<ServiceGroup>(SERVICE_GROUPS_ENDPOINTS.CREATE, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICE_GROUPS_QUERY_KEYS.SERVICE_GROUPS });
    },
  });
};
