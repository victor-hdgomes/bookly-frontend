import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "@/api";
import { CompanyDashboardData } from "@/types/dashboard.types";
import { DASHBOARD_QUERY_KEYS, DASHBOARD_ENDPOINTS } from "@/constants/dashboard.constants";

const fetchCompanyDashboard = async (companyId: string): Promise<CompanyDashboardData> => {
  const { data } = await api.get<CompanyDashboardData>(DASHBOARD_ENDPOINTS.COMPANY_DASHBOARD(companyId));
  return data;
};

export const useCompanyDashboard = (companyId: string): UseQueryResult<CompanyDashboardData, Error> => {
  return useQuery<CompanyDashboardData, Error>({
    queryKey: DASHBOARD_QUERY_KEYS.COMPANY_DASHBOARD(companyId),
    queryFn: () => fetchCompanyDashboard(companyId),
    enabled: !!companyId,
    retry: false,
  });
};


