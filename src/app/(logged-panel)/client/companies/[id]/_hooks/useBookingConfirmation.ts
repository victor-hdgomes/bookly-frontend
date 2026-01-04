import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useToast } from "@/hooks/useToast";
import { useCreateBooking } from "./useCreateBooking";
import { Service } from "@/types/service-group.types";
import { Company } from "@/types/prisma-models";
import { CLIENT_ROUTES } from "@/constants/client.constants";

interface UseBookingConfirmationProps {
  company: Company | undefined;
  selectedService: Service | null;
  selectedDate: Date | null;
  selectedTime: string | null;
  selectedEmployeeId: string | null | undefined;
  notes: string;
  setShowSuccess: (show: boolean) => void;
}

export function useBookingConfirmation({
  company,
  selectedService,
  selectedDate,
  selectedTime,
  selectedEmployeeId,
  notes,
  setShowSuccess,
}: UseBookingConfirmationProps) {
  const router = useRouter();
  const { t } = useTranslation("booking");
  const { toast } = useToast();
  const createBooking = useCreateBooking();

  const handleConfirm = async () => {
    if (!selectedService || !selectedDate || !selectedTime || !company) return;

    try {
      const [hours, minutes] = selectedTime.split(':');
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth();
      const day = selectedDate.getDate();
      
      const appointmentDate = new Date(year, month, day, parseInt(hours), parseInt(minutes), 0, 0);

      await createBooking.mutateAsync({
        companyId: company.id,
        serviceId: selectedService.id,
        date: appointmentDate.toISOString(),
        notes: notes || undefined,
        employeeId: selectedEmployeeId || undefined,
      });

      setShowSuccess(true);
      
      setTimeout(() => {
        router.push(CLIENT_ROUTES.CLIENT_DASHBOARD);
      }, 2000);
    } catch {
      toast({
        title: t("confirm.error"),
        variant: "destructive",
      });
    }
  };

  return {
    handleConfirm,
    isLoading: createBooking.isPending,
  };
}
