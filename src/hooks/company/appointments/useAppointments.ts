import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import { api } from "@/api";
import {
  APPOINTMENTS_QUERY_KEYS,
  APPOINTMENTS_ENDPOINTS,
} from "@/constants";
import {
  Appointment,
  AppointmentsResponse,
  CreateAppointmentPayload,
  UpdateAppointmentPayload,
  FilterAppointmentsParams,
} from "@/types/appointment.types";
import { useToast } from "@/hooks/useToast";

interface UseAppointmentsParams extends FilterAppointmentsParams {
  companyId: string | undefined;
  page?: number;
  limit?: number;
  enabled?: boolean;
}

export const useAppointments = ({
  companyId,
  page = 1,
  limit = 10,
  status,
  serviceId,
  userId,
  startDate,
  endDate,
  search = '',
  enabled = true,
}: UseAppointmentsParams) => {
  return useQuery({
    queryKey: APPOINTMENTS_QUERY_KEYS.APPOINTMENTS_BY_COMPANY(
      companyId || '',
      page,
      limit,
      status,
      serviceId,
      userId,
      startDate,
      endDate,
      search
    ),
    queryFn: async () => {
      if (!companyId)
        return { data: [], meta: { total: 0, page: 1, limit: 10, lastPage: 1 } };

      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        paginate: 'true',
      });

      if (status) {
        params.append('status', status);
      }

      if (serviceId) {
        params.append('serviceId', serviceId);
      }

      if (userId) {
        params.append('userId', userId);
      }

      if (startDate) {
        params.append('startDate', startDate);
      }

      if (endDate) {
        params.append('endDate', endDate);
      }

      if (search) {
        params.append('search', search);
      }

      const response = await api.get<AppointmentsResponse>(
        `${APPOINTMENTS_ENDPOINTS.LIST_BY_COMPANY(companyId)}?${params.toString()}`
      );
      return response.data;
    },
    enabled: enabled && !!companyId,
  });
};

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation("appointments");

  return useMutation({
    mutationFn: async (data: CreateAppointmentPayload) => {
      const response = await api.post<Appointment>(
        APPOINTMENTS_ENDPOINTS.CREATE,
        data
      );
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: APPOINTMENTS_QUERY_KEYS.APPOINTMENTS_BY_COMPANY(variables.companyId),
      });
      toast({
        title: t("toast.createSuccess"),
        description: t("toast.createSuccessDescription"),
      });
    },
    onError: () => {
      toast({
        title: t("toast.createError"),
        description: t("toast.createErrorDescription"),
        variant: "destructive",
      });
    },
  });
};

export const useUpdateAppointment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation("appointments");

  return useMutation({
    mutationFn: async ({
      appointmentId,
      data,
    }: {
      appointmentId: string;
      data: UpdateAppointmentPayload;
    }) => {
      const response = await api.patch<Appointment>(
        APPOINTMENTS_ENDPOINTS.UPDATE(appointmentId),
        data
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: APPOINTMENTS_QUERY_KEYS.APPOINTMENTS_BY_COMPANY(data.companyId),
      });
      toast({
        title: t("toast.updateSuccess"),
        description: t("toast.updateSuccessDescription"),
      });
    },
    onError: () => {
      toast({
        title: t("toast.updateError"),
        description: t("toast.updateErrorDescription"),
        variant: "destructive",
      });
    },
  });
};

export const useDeleteAppointment = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation("appointments");

  return useMutation({
    mutationFn: async (appointmentId: string) => {
      const response = await api.delete<Appointment>(
        APPOINTMENTS_ENDPOINTS.DELETE(appointmentId)
      );
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: APPOINTMENTS_QUERY_KEYS.APPOINTMENTS_BY_COMPANY(data.companyId),
      });
      toast({
        title: t("toast.deleteSuccess"),
        description: t("toast.deleteSuccessDescription"),
      });
    },
    onError: () => {
      toast({
        title: t("toast.deleteError"),
        description: t("toast.deleteErrorDescription"),
        variant: "destructive",
      });
    },
  });
};
