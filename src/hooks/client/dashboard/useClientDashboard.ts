import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "@/api";
import { ClientDashboardData } from "@/types/dashboard.types";
import { DASHBOARD_QUERY_KEYS, DASHBOARD_ENDPOINTS } from "@/constants/dashboard.constants";

const fetchClientDashboard = async (): Promise<ClientDashboardData> => {
  const { data } = await api.get<ClientDashboardData>(DASHBOARD_ENDPOINTS.CLIENT_DASHBOARD);
  return data;
};

export const useClientDashboard = (): UseQueryResult<ClientDashboardData, Error> => {
  return useQuery<ClientDashboardData, Error>({
    queryKey: DASHBOARD_QUERY_KEYS.CLIENT_DASHBOARD,
    queryFn: fetchClientDashboard,
    retry: false,
  });
};
