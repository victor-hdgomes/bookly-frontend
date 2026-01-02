import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { EMPLOYEES_QUERY_KEYS, EMPLOYEES_ENDPOINTS } from "@/constants";

interface DeleteEmployeeParams {
  employeeId: string;
  companyId: string;
}

export const useDeleteEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ employeeId }: DeleteEmployeeParams) => {
      await api.delete(EMPLOYEES_ENDPOINTS.DELETE(employeeId));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: EMPLOYEES_QUERY_KEYS.EMPLOYEES,
      });
    },
  });
};
