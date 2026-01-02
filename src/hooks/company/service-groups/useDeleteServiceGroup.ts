import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { SERVICE_GROUPS_QUERY_KEYS, SERVICE_GROUPS_ENDPOINTS } from "@/constants";

export const useDeleteServiceGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (serviceGroupId: string) => {
      await api.delete(SERVICE_GROUPS_ENDPOINTS.DELETE(serviceGroupId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICE_GROUPS_QUERY_KEYS.SERVICE_GROUPS });
    },
  });
};
