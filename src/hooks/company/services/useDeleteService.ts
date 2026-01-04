import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { api } from "@/api";
import { SERVICES_QUERY_KEYS, SERVICE_GROUPS_QUERY_KEYS, SERVICES_ENDPOINTS } from "@/constants";
import { useToast } from "@/hooks/useToast";

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation("services");

  return useMutation({
    mutationFn: async ({ serviceId, serviceName }: { serviceId: string; serviceName: string }) => {
      await api.delete(SERVICES_ENDPOINTS.DELETE(serviceId));
      return serviceName;
    },
    onSuccess: (serviceName) => {
      queryClient.invalidateQueries({ queryKey: [SERVICES_QUERY_KEYS.SERVICES] });
      queryClient.invalidateQueries({ queryKey: [SERVICE_GROUPS_QUERY_KEYS.SERVICE_GROUPS] });
      
      toast({
        title: t("deleteDialog.successTitle"),
        description: t("deleteDialog.successDescription", { serviceName }),
      });
    },
    onError: () => {
      toast({
        title: "Erro",
        description: "Não foi possível excluir o serviço",
        variant: "destructive",
      });
    },
  });
};
