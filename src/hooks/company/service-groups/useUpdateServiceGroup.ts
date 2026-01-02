import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { ServiceGroup } from "@/types/service-group.types";
import { SERVICE_GROUPS_QUERY_KEYS, SERVICE_GROUPS_ENDPOINTS } from "@/constants";

interface UpdateServiceGroupDto {
  name: string;
}

export const useUpdateServiceGroup = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateServiceGroupDto }) => {
      const response = await api.patch<ServiceGroup>(SERVICE_GROUPS_ENDPOINTS.UPDATE(id), data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SERVICE_GROUPS_QUERY_KEYS.SERVICE_GROUPS });
    },
  });
};
