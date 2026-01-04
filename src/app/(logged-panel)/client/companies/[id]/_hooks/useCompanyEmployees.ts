import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { Employee } from "@/hooks/company/employees/useEmployees";
import { CLIENT_ENDPOINTS, CLIENT_QUERY_KEYS } from "@/constants";

export const useCompanyEmployees = (companySlug: string) => {
  return useQuery({
    queryKey: CLIENT_QUERY_KEYS.CLIENT_COMPANY_EMPLOYEES(companySlug),
    queryFn: async () => {
      const response = await api.get<{ data: Employee[] }>(CLIENT_ENDPOINTS.CLIENT_COMPANY_EMPLOYEES(companySlug));
      return response.data.data;
    },
    enabled: !!companySlug,
  });
};
