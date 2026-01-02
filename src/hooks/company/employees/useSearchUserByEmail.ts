import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { api } from "@/api";
import { EMPLOYEES_ENDPOINTS, EMPLOYEES_QUERY_KEYS } from "@/constants";

interface SearchUserResult {
  id: string;
  firstName: string | null;
  lastName: string | null;
  displayName: string | null;
  email: string;
  photo: string | null;
}

export const useSearchUserByEmail = (email: string, enabled: boolean = false) => {
  const { t } = useTranslation('employees');
  
  return useQuery({
    queryKey: EMPLOYEES_QUERY_KEYS.SEARCH_USER(email),
    queryFn: async () => {
      if (!email) throw new Error(t('errors.emailRequired'));

      const response = await api.get<SearchUserResult>(EMPLOYEES_ENDPOINTS.SEARCH_USER, {
        params: { email },
      });
      return response.data;
    },
    enabled: enabled && !!email && email.includes('@'),
    retry: false,
  });
};
