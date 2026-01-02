import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { UpdateServiceDto, Service } from "@/types/service-group.types";
import { SERVICES_QUERY_KEYS, SERVICE_GROUPS_QUERY_KEYS, SERVICES_ENDPOINTS } from "@/constants";

export const useUpdateService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateServiceDto }) => {
      const response = await api.patch<Service>(SERVICES_ENDPOINTS.UPDATE(id), data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SERVICES_QUERY_KEYS.SERVICES] });
      queryClient.invalidateQueries({ queryKey: [SERVICE_GROUPS_QUERY_KEYS.SERVICE_GROUPS] });
    },
  });
};
