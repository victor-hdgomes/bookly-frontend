import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api";
import { CreateAppointmentPayload } from "@/types/appointment.types";
import { CLIENT_ENDPOINTS, CLIENT_QUERY_KEYS } from "@/constants";

export const useCreateBooking = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateAppointmentPayload) => {
      const response = await api.post(CLIENT_ENDPOINTS.CLIENT_APPOINTMENTS, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CLIENT_QUERY_KEYS.CLIENT_APPOINTMENTS });
    },
  });
};
