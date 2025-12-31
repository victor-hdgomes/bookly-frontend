"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Calendar, Clock, User } from "lucide-react";
import { UpcomingAppointment } from "@/types/dashboard.types";

export function CompanyUpcomingAppointments({ appointments }: { appointments: UpcomingAppointment[] }) {
  const { t } = useTranslation('companyDashboard');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    });
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
          <div className="space-y-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="border-l-4 border-primary">
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-muted-foreground" />
                        <span className="font-semibold">
                          {appointment.user.displayName || appointment.user.email}
                        </span>
                      </div>

                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{formatDate(appointment.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{formatTime(appointment.date)}</span>
                        </div>
                      </div>

                      <div className="text-sm">
                        <span className="font-medium">{t('upcomingAppointments.service')}:</span>{' '}
                        {appointment.service.name}
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{appointment.service.duration} min</span>
                        <span className="font-semibold text-primary">
                          R$ {appointment.service.price.toFixed(2)}
                        </span>
                      </div>

                      {appointment.notes && (
                        <div className="text-sm text-muted-foreground italic">
                          {t('upcomingAppointments.notes')}: {appointment.notes}
                        </div>
                      )}
                    </div>

                    {appointment.user.photo && (
                      <img
                        src={appointment.user.photo}
                        alt={appointment.user.displayName || 'User'}
                        className="w-12 h-12 rounded-full"
                      />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}


