import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "@/api";

export interface Auth {
  displayName?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  photo?: string;
}

const fetchAuth = async (): Promise<Auth> => {
  const { data } = await api.get<Auth>(`auth/me`);
  return data;
};

export const useAuth = (): UseQueryResult<Auth, Error> => {
  return useQuery<Auth, Error>({
    queryKey: ["fetchAuth"],
    queryFn: fetchAuth,
    retry: false,
  });
};
