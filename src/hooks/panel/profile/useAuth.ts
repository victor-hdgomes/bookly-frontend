import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { api } from "@/api";
import { User } from "@/types/prisma-models";


const fetchAuth = async (): Promise<User> => {
  const { data } = await api.get<User>(`auth/me`);
  return data;
};

export const useAuth = (): UseQueryResult<User, Error> => {
  return useQuery<User, Error>({
    queryKey: ["fetchAuth"],
    queryFn: fetchAuth,
    retry: false,
  });
};
