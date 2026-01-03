import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { Company } from "@/types/prisma-models";
import { CLIENT_ENDPOINTS, CLIENT_QUERY_KEYS } from "@/constants";

interface PaginatedResponse {
  data: Company[];
  total: number;
  page: number;
  totalPages: number;
}

interface UseCompaniesParams {
  page?: number;
  limit?: number;
  search?: string;
}

export const useCompanies = ({ page = 1, limit = 12, search = "" }: UseCompaniesParams = {}) => {
  return useQuery({
    queryKey: CLIENT_QUERY_KEYS.CLIENT_COMPANIES_LIST(page, search),
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      if (search) {
        params.append('search', search);
      }

      const response = await api.get<PaginatedResponse>(`${CLIENT_ENDPOINTS.CLIENT_COMPANIES_LIST}?${params.toString()}`);
      return response.data;
    },
  });
};
