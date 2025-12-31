import { ReactNode } from "react";
import { Calendar, CheckCircle, XCircle, Clock, Briefcase, DollarSign } from "lucide-react";
import { AppointmentStats, CompanyStats } from "@/types/dashboard.types";

export interface StatConfig {
  key: string;
  title: string;
  value: number | string;
  icon: ReactNode;
  color: string;
}

interface GetCompanyStatsConfigParams {
  t: (key: string) => string;
  appointmentsStats: AppointmentStats;
  companyStats: CompanyStats;
}

export const getCompanyStatsConfig = ({
  t,
  appointmentsStats,
  companyStats,
}: GetCompanyStatsConfigParams): StatConfig[] => [
  {
    key: "total",
    title: t('stats.appointments.total'),
    value: appointmentsStats.total,
    icon: <Calendar className="w-5 h-5" />,
    color: "text-blue-500",
  },
  {
    key: "scheduled",
    title: t('stats.appointments.scheduled'),
    value: appointmentsStats.scheduled,
    icon: <Clock className="w-5 h-5" />,
    color: "text-yellow-500",
  },
  {
    key: "completed",
    title: t('stats.appointments.completed'),
    value: appointmentsStats.completed,
    icon: <CheckCircle className="w-5 h-5" />,
    color: "text-green-500",
  },
  {
    key: "canceled",
    title: t('stats.appointments.canceled'),
    value: appointmentsStats.canceled,
    icon: <XCircle className="w-5 h-5" />,
    color: "text-red-500",
  },
  {
    key: "services",
    title: t('stats.company.totalServices'),
    value: companyStats.totalServices,
    icon: <Briefcase className="w-5 h-5" />,
    color: "text-purple-500",
  },
  {
    key: "revenue",
    title: t('stats.company.totalRevenue'),
    value: `R$ ${companyStats.totalRevenue.toFixed(2)}`,
    icon: <DollarSign className="w-5 h-5" />,
    color: "text-emerald-500",
  },
];

