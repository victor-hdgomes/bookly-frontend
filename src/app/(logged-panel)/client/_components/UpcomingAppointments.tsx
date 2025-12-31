"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Calendar, Clock, Briefcase } from "lucide-react";

export interface Appointment {
  id?: string | number;
  title?: string;
  date?: string;
  client?: string;
}

export function UpcomingAppointments({ appointments }: { appointments: Appointment[] }) {
  const { t } = useTranslation('dashboard');

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
            {appointments.map((appt, idx) => (
              <Card key={appt.id ?? idx} className="border-l-4 border-primary">
                <CardContent className="pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-muted-foreground" />
                      <span className="font-semibold">
                        {appt.title || t('upcomingAppointments.defaultTitle')}
                      </span>
                    </div>

                    {appt.date && (
                      <div className="text-sm space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span>{formatDate(appt.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span>{formatTime(appt.date)}</span>
                        </div>
                      </div>
                    )}

                    {!appt.date && (
                      <div className="text-sm text-muted-foreground">
                        {t('upcomingAppointments.noDate')}
                      </div>
                    )}

                    {appt.client && (
                      <div className="text-sm">
                        <span className="font-medium">{t('upcomingAppointments.clientLabel')}</span>{' '}
                        {appt.client}
                      </div>
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
