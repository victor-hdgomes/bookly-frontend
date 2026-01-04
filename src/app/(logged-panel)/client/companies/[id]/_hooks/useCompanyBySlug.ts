import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { Company } from "@/types/prisma-models";
import { CLIENT_ENDPOINTS, CLIENT_QUERY_KEYS } from "@/constants";

export const useCompanyBySlug = (slug: string) => {
  return useQuery({
    queryKey: CLIENT_QUERY_KEYS.CLIENT_COMPANY_DETAIL(slug),
    queryFn: async () => {
      const response = await api.get<Company>(CLIENT_ENDPOINTS.CLIENT_COMPANY_DETAIL(slug));
      return response.data;
    },
    enabled: !!slug,
  });
};
