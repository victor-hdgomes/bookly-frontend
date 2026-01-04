"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Calendar, Clock, User, CheckCircle } from "lucide-react";
import { Appointment, AppointmentStatus } from "@/types/appointment.types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ListItem } from "@/components/globals";
import { AppointmentDeleteDialog } from "./AppointmentDeleteDialog";
import { AppointmentCompleteDialog } from "./AppointmentCompleteDialog";
import { EditAppointmentDialog } from "./EditAppointmentDialog";
import { useUpdateAppointment } from "@/hooks/company/appointments/useAppointments";
import { APPOINTMENT_STATUS_COLORS } from "@/constants";
import { getUserDisplayName } from "@/lib/user-utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AppointmentListItemProps {
  appointment: Appointment;
  companyId?: string;
  onDelete: (appointmentId: string) => Promise<void>;
}

export function AppointmentListItem({
  appointment,
  companyId,
  onDelete,
}: AppointmentListItemProps) {
  const { t } = useTranslation("appointments");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCompleteDialogOpen, setIsCompleteDialogOpen] = useState(false);
  const updateAppointment = useUpdateAppointment();

  const handleDeleteConfirm = async () => {
    await onDelete(appointment.id);
    setIsDeleteDialogOpen(false);
  };

  const handleCompleteAppointment = async () => {
    await updateAppointment.mutateAsync({
      appointmentId: appointment.id,
      data: { status: AppointmentStatus.COMPLETED },
    });
    setIsCompleteDialogOpen(false);
  };

  const formattedDate = format(
    new Date(appointment.date),
    "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
    { locale: ptBR }
  );

  const statusColor = APPOINTMENT_STATUS_COLORS[appointment.status];

  const badges = (
    <Badge
      variant={
        statusColor === "green"
          ? "default"
          : statusColor === "red"
          ? "destructive"
          : "secondary"
      }
      className="text-xs"
    >
      {t(`status.${appointment.status.toLowerCase()}`)}
    </Badge>
  );

  const content = (
    <div className="flex flex-col gap-2 text-sm text-muted-foreground mt-1">
      <div className="flex flex-wrap gap-4">
        <span className="flex items-center gap-1">
          <Calendar className="h-3 w-3" />
          {formattedDate}
        </span>
        <span className="flex items-center gap-1">
          <User className="h-3 w-3" />
          {getUserDisplayName(appointment.user)}
        </span>
      </div>
      <div className="flex flex-wrap gap-4">
        <span className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          {t("list.durationMinutes", { duration: appointment.service.duration })}
        </span>
        <span className="font-medium">
          {appointment.service.price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
      {appointment.notes && (
        <p className="text-xs italic mt-1">{appointment.notes}</p>
      )}
    </div>
  );

  const customActions = appointment.status === AppointmentStatus.SCHEDULED ? (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setIsCompleteDialogOpen(true)}
      disabled={updateAppointment.isPending}
      title={t("actions.complete")}
    >
      <CheckCircle className="h-4 w-4 text-green-600" />
    </Button>
  ) : null;

  return (
    <>
      <ListItem
        isActive={true}
        title={appointment.service.name}
        badges={badges}
        content={content}
        customActions={customActions}
        onEdit={() => setIsEditDialogOpen(true)}
        onDelete={() => setIsDeleteDialogOpen(true)}
      />

      {companyId && (
        <EditAppointmentDialog
          open={isEditDialogOpen}
          onOpenChange={setIsEditDialogOpen}
          appointment={appointment}
          companyId={companyId}
        />
      )}

      <AppointmentDeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        appointmentDate={formattedDate}
        onConfirm={handleDeleteConfirm}
      />

      <AppointmentCompleteDialog
        open={isCompleteDialogOpen}
        onOpenChange={setIsCompleteDialogOpen}
        appointmentDate={formattedDate}
        serviceName={appointment.service.name}
        onConfirm={handleCompleteAppointment}
        isPending={updateAppointment.isPending}
      />
    </>
  );
}
