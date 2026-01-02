import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { SERVICES_QUERY_KEYS, SERVICE_GROUPS_QUERY_KEYS, SERVICES_ENDPOINTS } from "@/constants";

export const useDeleteService = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (serviceId: string) => {
      await api.delete(SERVICES_ENDPOINTS.DELETE(serviceId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [SERVICES_QUERY_KEYS.SERVICES] });
      queryClient.invalidateQueries({ queryKey: [SERVICE_GROUPS_QUERY_KEYS.SERVICE_GROUPS] });
    },
  });
};
