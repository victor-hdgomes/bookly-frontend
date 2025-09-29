import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "@/api";

interface DashboardData {
  userCount: number;
  activeSessions: number;
}

const fetchDashboard = async (): Promise<DashboardData> => {
  const { data } = await api.get<DashboardData>("companies");
  return data;
};

export const useDashboard = (): UseQueryResult<DashboardData, Error> => {
  return useQuery<DashboardData, Error>({
    queryKey: ["companies"],
    queryFn: fetchDashboard,
    retry: false,
  });
};
