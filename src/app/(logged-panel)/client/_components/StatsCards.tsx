"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { Calendar, CheckCircle, XCircle, Clock } from "lucide-react";
import { AppointmentStats } from "@/types/dashboard.types";

export function StatsCards({ stats }: { stats: AppointmentStats }) {
  const { t } = useTranslation('dashboard');
  
  const statsConfig = [
    {
      key: "total",
      title: t('stats.total.title'),
      value: stats.total,
      icon: <Calendar className="w-5 h-5" />,
      color: "text-blue-500",
    },
    {
      key: "scheduled",
      title: t('stats.scheduled.title'),
      value: stats.scheduled,
      icon: <Clock className="w-5 h-5" />,
      color: "text-yellow-500",
    },
    {
      key: "completed",
      title: t('stats.completed.title'),
      value: stats.completed,
      icon: <CheckCircle className="w-5 h-5" />,
      color: "text-green-500",
    },
    {
      key: "canceled",
      title: t('stats.canceled.title'),
      value: stats.canceled,
      icon: <XCircle className="w-5 h-5" />,
      color: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statsConfig.map(({ key, title, value, icon, color }) => (
        <Card key={key}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{title}</CardTitle>
            <div className={color}>{icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
