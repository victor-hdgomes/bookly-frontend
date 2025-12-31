export interface AppointmentStats {
  total: number;
  scheduled: number;
  completed: number;
  canceled: number;
}

export interface User {
  id: string;
  displayName: string | null;
  email: string;
  photo: string | null;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
}

export interface UpcomingAppointment {
  id: string;
  date: string;
  status: string;
  notes: string | null;
  user: User;
  service: Service;
}

export interface CompanyStats {
  totalServices: number;
  totalRevenue: number;
}

export interface CompanyDashboardData {
  appointmentsStats: AppointmentStats;
  upcomingAppointments: UpcomingAppointment[];
  stats: CompanyStats;
}

export interface ClientDashboardData {
  appointmentsStats: AppointmentStats;
  upcomingAppointments: UpcomingAppointment[];
}

