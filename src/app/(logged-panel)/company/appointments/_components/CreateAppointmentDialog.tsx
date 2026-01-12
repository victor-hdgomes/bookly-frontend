"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslation } from "react-i18next";
import { useCreateAppointment } from "@/hooks/company/appointments/useAppointments";
import { useServices } from "@/hooks/company/services/useServices";
import { useEmployees } from "@/hooks/company/employees/useEmployees";
import {
  createAppointmentSchema,
  type CreateAppointmentFormData,
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
import { fromDateTimeLocalToISO } from "@/lib/date-utils";

interface CreateAppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  companyId: string;
}

export function CreateAppointmentDialog({
  open,
  onOpenChange,
  companyId,
}: CreateAppointmentDialogProps) {
  const { t } = useTranslation("appointments");
  const createAppointment = useCreateAppointment();
  const { data: services } = useServices(companyId);
  const { data: employeesResponse } = useEmployees({
    companyId,
  });

  const form = useForm<CreateAppointmentFormData>({
    resolver: zodResolver(createAppointmentSchema),
    defaultValues: {
      date: "",
      notes: "",
      serviceId: "",
    },
  });

  const onSubmit = async (values: CreateAppointmentFormData) => {
    await createAppointment.mutateAsync({
      ...values,
      date: fromDateTimeLocalToISO(values.date),
      companyId,
    });

    form.reset();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("createDialog.title")}</DialogTitle>
          <DialogDescription>
            {t("createDialog.description")}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ServiceSelectField
              control={form.control}
              name="serviceId"
              label={t("createDialog.serviceLabel")}
              services={services}
            />

            <EmployeeSelectField
              control={form.control}
              name="employeeId"
              label={t("createDialog.employeeLabel")}
              employees={employeesResponse?.data}
            />

            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("createDialog.dateLabel")}</FormLabel>
                  <FormControl>
                    <Input
                      type="datetime-local"
                      {...field}
                    />
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
                  <FormLabel>{t("createDialog.notesLabel")}</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={t("createDialog.notesPlaceholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFormFooter
              onCancel={() => onOpenChange(false)}
              cancelLabel={t("createDialog.cancelButton")}
              submitLabel={t("createDialog.createButton")}
              submitLoadingLabel={t("createDialog.creatingButton")}
              isSubmitting={createAppointment.isPending}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
