"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListItem } from "@/components/globals";
import { Badge } from "@/components/ui/badge";
import { useTranslation } from "react-i18next";
import { Calendar, Clock } from "lucide-react";
import { UpcomingAppointment } from "@/types/dashboard.types";
import { getUserDisplayName, getUserInitials } from "@/lib/user-utils";
import { formatCurrency, formatDateTime } from "@/lib/date-utils";

export function CompanyUpcomingAppointments({ appointments }: { appointments: UpcomingAppointment[] }) {
  const { t } = useTranslation('companyDashboard');

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
              const content = (
                <div className="flex flex-col gap-2 text-sm text-muted-foreground mt-1">
                  <div className="flex flex-wrap gap-6">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {formatDateTime(appointment.date)}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-6 items-center">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {t('upcomingAppointments.duration', { duration: appointment.service.duration })}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {formatCurrency(appointment.service.price)}
                    </Badge>
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
                  subtitle={getUserDisplayName(appointment.user)}
                  avatar={{
                    src: appointment.user.photo,
                    fallback: getUserInitials(appointment.user),
                  }}
                  content={content}
                />
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}


