"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useUpdateAppointment } from "@/hooks/company/appointments/useAppointments";
import { useServices } from "@/hooks/company/services/useServices";
import { useEmployees } from "@/hooks/company/employees/useEmployees";
import {
  updateAppointmentSchema,
  type UpdateAppointmentFormData,
} from "@/schemas/appointment.schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DialogFormFooter } from "@/components/ui/dialog-form-footer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ServiceSelectField } from "@/components/ui/service-select-field";
import { EmployeeSelectField } from "@/components/ui/employee-select-field";
import { AppointmentStatusSelectField } from "@/components/ui/appointment-status-select-field";
import { Appointment } from "@/types/appointment.types";
import { toDateTimeLocalFormat, fromDateTimeLocalToISO } from "@/lib/date-utils";

interface EditAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  appointment: Appointment;
  companyId: string;
}

export function EditAppointmentDialog({
  open,
  onOpenChange,
  appointment,
  companyId,
}: EditAppointmentDialogProps) {
  const { t } = useTranslation("appointments");
  const updateAppointment = useUpdateAppointment();
  const { data: services } = useServices(companyId);
  const { data: employeesResponse } = useEmployees({
    companyId,
  });

  const form = useForm<UpdateAppointmentFormData>({
    resolver: zodResolver(updateAppointmentSchema),
    defaultValues: {
      date: toDateTimeLocalFormat(appointment.date),
      notes: appointment.notes || "",
      status: appointment.status,
      serviceId: appointment.serviceId,
      employeeId: appointment.employeeId || undefined,
    },
  });

  const onSubmit = async (values: UpdateAppointmentFormData) => {
    const data = {
      ...values,
      date: values.date ? fromDateTimeLocalToISO(values.date) : undefined,
    };
    
    await updateAppointment.mutateAsync({
      appointmentId: appointment.id,
      data,
    });

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("editDialog.title")}</DialogTitle>
          <DialogDescription>
            {t("editDialog.description")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ServiceSelectField
              control={form.control}
              name="serviceId"
              label={t("editDialog.serviceLabel")}
              services={services}
            />

            <EmployeeSelectField
              control={form.control}
              name="employeeId"
              label={t("editDialog.employeeLabel")}
              employees={employeesResponse?.data}
            />

            <AppointmentStatusSelectField
              control={form.control}
              name="status"
              label={t("editDialog.statusLabel")}
              statusLabels={{
                scheduled: t("status.scheduled"),
                completed: t("status.completed"),
                canceled: t("status.canceled"),
              }}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("editDialog.dateLabel")}</FormLabel>
                  <FormControl>
                    <Input type="datetime-local" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("editDialog.notesLabel")}</FormLabel>
                  <FormControl>
                    <Textarea {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFormFooter
              onCancel={() => onOpenChange(false)}
              cancelLabel={t("editDialog.cancelButton")}
              submitLabel={t("editDialog.updateButton")}
              submitLoadingLabel={t("editDialog.updatingButton")}
              isSubmitting={updateAppointment.isPending}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
