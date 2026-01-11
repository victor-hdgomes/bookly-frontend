"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ListItem } from "@/components/globals";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTranslation } from "react-i18next";
import { Calendar, Clock } from "lucide-react";
import { UpcomingAppointment } from "@/types/dashboard.types";
import { getUserDisplayName, getUserInitials } from "@/lib/user-utils";
import { formatCurrency, formatDateTime } from "@/lib/date-utils";

export function CompanyUpcomingAppointments({ appointments }: { appointments: UpcomingAppointment[] }) {
  const { t } = useTranslation('companyDashboard');

  return (
    <Card className="my-4">
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
              const finalPrice = appointment.service.price - appointment.service.discount;
              const hasDiscount = appointment.service.discount > 0;

              const content = (
                <div className="flex items-center justify-between">
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

                  <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={appointment.user.photo ?? undefined} alt={getUserDisplayName(appointment.user)} />
                          <AvatarFallback className="text-xs">{getUserInitials(appointment.user)}</AvatarFallback>
                        </Avatar>
                        <span className="text-xs">
                          <span className="font-medium">{t('upcomingAppointments.client')}:</span> {getUserDisplayName(appointment.user)}
                        </span>
                      </div>
                    </div>
                </div>
              );

              return (
                <ListItem
                  key={appointment.id}
                  isActive={true}
                  title={appointment.service.name}
                  subtitle={`${getUserDisplayName(appointment.user)}${appointment.employee ? ` • ${getUserDisplayName(appointment.employee)}` : ''}`}
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


