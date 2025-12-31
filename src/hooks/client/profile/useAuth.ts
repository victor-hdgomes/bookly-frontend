import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "@/api";
import { User } from "@/types/prisma-models";
import { AUTH_QUERY_KEYS, AUTH_ENDPOINTS } from "@/constants/auth.constants";

const fetchAuth = async (): Promise<User> => {
  const { data } = await api.get<User>(AUTH_ENDPOINTS.ME);
  return data;
};

export const useAuth = (): UseQueryResult<User, Error> => {
  return useQuery<User, Error>({
    queryKey: AUTH_QUERY_KEYS.FETCH_AUTH,
    queryFn: fetchAuth,
    retry: false,
  });
};
