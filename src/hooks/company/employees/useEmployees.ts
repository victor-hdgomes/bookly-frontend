import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { EMPLOYEES_QUERY_KEYS, EMPLOYEES_ENDPOINTS } from "@/constants";

export interface Employee {
  id: string;
  position: string | null;
  isActive: boolean;
  userId: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    displayName: string | null;
    email: string;
    photo: string | null;
  };
}

interface EmployeesResponse {
  data: Employee[];
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
  };
}

interface UseEmployeesParams {
  companyId: string | undefined;
  page?: number;
  limit?: number;
  search?: string;
  showInactive?: boolean;
  enabled?: boolean;
}

export const useEmployees = ({
  companyId,
  page = 1,
  limit = 10,
  search = '',
  showInactive = false,
  enabled = true,
}: UseEmployeesParams) => {
  return useQuery({
    queryKey: EMPLOYEES_QUERY_KEYS.EMPLOYEES_BY_COMPANY(companyId || '', page, limit, search, showInactive),
    queryFn: async () => {
      if (!companyId) return { data: [], meta: { total: 0, page: 1, limit: 10, lastPage: 1 } };
      
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        paginate: 'true',
      });
      
      if (search) {
        params.append('search', search);
      }
      
      if (showInactive) {
        params.append('showInactive', 'true');
      }
      
      const response = await api.get<EmployeesResponse>(
        `${EMPLOYEES_ENDPOINTS.LIST_BY_COMPANY(companyId)}?${params.toString()}`
      );
      return response.data;
    },
    enabled: enabled && !!companyId,
  });
};
