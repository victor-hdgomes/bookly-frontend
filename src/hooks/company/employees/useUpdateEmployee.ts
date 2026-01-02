import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { EMPLOYEES_QUERY_KEYS, EMPLOYEES_ENDPOINTS } from "@/constants";
import { Employee } from "./useEmployees";

interface UpdateEmployeeDto {
  position?: string;
  isActive?: boolean;
}

interface UpdateEmployeeParams {
  employeeId: string;
  companyId: string;
  data: UpdateEmployeeDto;
}

export const useUpdateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ employeeId, data }: UpdateEmployeeParams) => {
      const response = await api.patch<Employee>(EMPLOYEES_ENDPOINTS.UPDATE(employeeId), data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: EMPLOYEES_QUERY_KEYS.EMPLOYEES,
      });
    },
  });
};
