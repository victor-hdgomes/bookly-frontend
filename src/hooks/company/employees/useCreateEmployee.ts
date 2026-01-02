import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { EMPLOYEES_QUERY_KEYS, EMPLOYEES_ENDPOINTS } from "@/constants";
import { Employee } from "./useEmployees";

interface CreateEmployeeDto {
  userId: string;
  companyId: string;
  position?: string;
}

export const useCreateEmployee = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateEmployeeDto) => {
      const response = await api.post<Employee>(EMPLOYEES_ENDPOINTS.CREATE, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: EMPLOYEES_QUERY_KEYS.EMPLOYEES,
      });
    },
  });
};
