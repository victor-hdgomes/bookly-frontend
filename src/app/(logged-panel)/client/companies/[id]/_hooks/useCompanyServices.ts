import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { ServiceGroup } from "@/types/service-group.types";
import { CLIENT_ENDPOINTS, CLIENT_QUERY_KEYS } from "@/constants";

export const useCompanyServices = (companySlug: string) => {
  return useQuery({
    queryKey: CLIENT_QUERY_KEYS.CLIENT_COMPANY_SERVICES(companySlug),
    queryFn: async () => {
      const response = await api.get<{ data: ServiceGroup[] }>(CLIENT_ENDPOINTS.CLIENT_COMPANY_SERVICES(companySlug));
      return response.data.data;
    },
    enabled: !!companySlug,
  });
};
