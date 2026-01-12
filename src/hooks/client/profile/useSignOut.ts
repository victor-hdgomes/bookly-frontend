import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { AUTH_ENDPOINTS, AUTH_ROUTES } from "@/constants/auth.constants";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const signOut = async (): Promise<void> => {
  await api.post(AUTH_ENDPOINTS.SIGN_OUT);
};

export const useSignOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setAccessToken } = useAuth();

  return useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      setAccessToken(null);
      queryClient.clear();
      router.push(AUTH_ROUTES.HOME);
    },
    onError: () => {
      setAccessToken(null);
      router.push(AUTH_ROUTES.HOME);
    },
  });
};
