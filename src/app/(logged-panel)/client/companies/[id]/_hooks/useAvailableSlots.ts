import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { CLIENT_ENDPOINTS, CLIENT_QUERY_KEYS } from "@/constants";

interface AvailableSlot {
  time: string;
  available: boolean;
}

export const useAvailableSlots = (
  companySlug: string,
  date: string | null,
  serviceId: string | null,
  employeeId: string | null
) => {
  return useQuery({
    queryKey: CLIENT_QUERY_KEYS.CLIENT_COMPANY_AVAILABLE_SLOTS(companySlug, date, serviceId, employeeId),
    queryFn: async () => {
      const params = new URLSearchParams();
      if (date) params.append('date', date);
      if (serviceId) params.append('serviceId', serviceId);
      if (employeeId) params.append('employeeId', employeeId);

      const response = await api.get<{ data: AvailableSlot[] }>(
        `${CLIENT_ENDPOINTS.CLIENT_COMPANY_AVAILABLE_SLOTS(companySlug)}?${params.toString()}`
      );
      return response.data.data;
    },
    enabled: !!companySlug && !!date && !!serviceId,
  });
};
