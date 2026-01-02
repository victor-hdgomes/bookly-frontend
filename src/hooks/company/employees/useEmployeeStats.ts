import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { EMPLOYEES_QUERY_KEYS, EMPLOYEES_ENDPOINTS } from "@/constants";

export interface EmployeeStats {
  employee: {
    id: string;
    position: string | null;
    user: {
      id: string;
      firstName: string | null;
      lastName: string | null;
      displayName: string | null;
      email: string;
      photo: string | null;
    };
  };
  stats: {
    totalAppointments: number;
    totalRevenue: number;
  };
}

export const useEmployeeStats = (companyId: string | undefined, enabled = true) => {
  return useQuery({
    queryKey: EMPLOYEES_QUERY_KEYS.EMPLOYEE_STATS(companyId || ''),
    queryFn: async () => {
      if (!companyId) return [];
      const response = await api.get<EmployeeStats[]>(EMPLOYEES_ENDPOINTS.STATS(companyId));
      return response.data;
    },
    enabled: enabled && !!companyId,
  });
};
