import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListItem, DeleteConfirmDialog } from "@/components/globals";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Calendar, Clock } from "lucide-react";
import { useDateFormat } from "@/hooks";
import { formatCurrency, formatDateTimeWithLocale } from "@/lib/date-utils";
import { calculateFinalPrice, hasDiscount as checkHasDiscount } from "@/lib/price-utils";
import { getInitials } from "@/lib/user-utils";
import { UpcomingAppointment } from "@/types/dashboard.types";
import { useDeleteAppointment } from "@/hooks/company/appointments";
import { DASHBOARD_QUERY_KEYS } from "@/constants";

export function UpcomingAppointments({ appointments }: { appointments: UpcomingAppointment[] }) {
  const { t } = useTranslation('dashboard');
  const { formatLongDate, formatTime } = useDateFormat();
  const deleteAppointment = useDeleteAppointment({
    namespace: "dashboard",
    invalidateQueryKey: [...DASHBOARD_QUERY_KEYS.CLIENT_DASHBOARD],
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<UpcomingAppointment | null>(null);

  const handleDeleteClick = (appointment: UpcomingAppointment) => {
    setSelectedAppointment(appointment);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (selectedAppointment) {
      await deleteAppointment.mutateAsync(selectedAppointment.id);
      setDeleteDialogOpen(false);
      setSelectedAppointment(null);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('upcomingAppointments.title')}</CardTitle>
      </CardHeader>
      <CardContent>
        {appointments.length === 0 ? (
          <p className="text-muted-foreground text-center py-4">
            {t('upcomingAppointments.emptyMessage')}
          </p>
        ) : (
          <div className="space-y-3">
            {appointments.map((appointment) => {
              const finalPrice = calculateFinalPrice(appointment.service.price, appointment.service.discount);
              const hasDiscount = checkHasDiscount(appointment.service.discount);

              const content = (
                <div className="flex flex-col gap-2 text-sm text-muted-foreground mt-1">
                  <div className="flex flex-wrap gap-6">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDateTimeWithLocale(appointment.date, formatLongDate, formatTime)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-6 items-center">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {t('upcomingAppointments.duration', { duration: appointment.service.duration })}
                    </span>
                    <div className="flex items-center gap-2">
                      {hasDiscount && (
                        <Badge variant="outline" className="text-xs line-through text-muted-foreground">
                          {formatCurrency(appointment.service.price)}
                        </Badge>
                      )}
                      <Badge variant="secondary" className="text-xs">
                        {formatCurrency(finalPrice)}
                      </Badge>
                    </div>
                  </div>
                  {appointment.notes && (
                    <p className="text-xs italic mt-1">{appointment.notes}</p>
                  )}
                </div>
              );

              return (
                <ListItem
                  key={appointment.id}
                  isActive={true}
                  title={appointment.service.name}
                  subtitle={appointment.company.name}
                  avatar={{
                    src: appointment.company.photo,
                    fallback: getInitials(appointment.company.name),
                  }}
                  content={content}
                  onDelete={() => handleDeleteClick(appointment)}
                />
              );
            })}
          </div>
        )}
      </CardContent>

      {selectedAppointment && (
        <DeleteConfirmDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          title={t("deleteDialog.title")}
          description={t("deleteDialog.description", {
            service: selectedAppointment.service.name,
            company: selectedAppointment.company.name,
          })}
          confirmText={deleteAppointment.isPending ? t("deleteDialog.deletingButton") : t("deleteDialog.confirmButton")}
          cancelText={t("deleteDialog.cancelButton")}
          onConfirm={handleDeleteConfirm}
          isPending={deleteAppointment.isPending}
        />
      )}
    </Card>
  );
}
