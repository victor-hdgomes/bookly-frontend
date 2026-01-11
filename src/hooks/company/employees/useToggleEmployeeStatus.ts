import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { EMPLOYEES_QUERY_KEYS, EMPLOYEES_ENDPOINTS } from "@/constants";
import { Employee } from "./useEmployees";

interface ToggleEmployeeStatusParams {
  employeeId: string;
}

export const useToggleEmployeeStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ employeeId }: ToggleEmployeeStatusParams) => {
      const response = await api.patch<Employee>(
        EMPLOYEES_ENDPOINTS.TOGGLE_STATUS(employeeId)
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: EMPLOYEES_QUERY_KEYS.EMPLOYEES,
      });
    },
  });
};
