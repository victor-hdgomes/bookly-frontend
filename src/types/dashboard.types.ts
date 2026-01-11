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

export interface AppointmentService {
  id: string;
  name: string;
  price: number;
  duration: number;
}

export interface AppointmentCompany {
  id: string;
  name: string;
  photo: string | null;
}

export interface UpcomingAppointment {
  id: string;
  date: string;
  status: string;
  notes: string | null;
  user: User;
  employee?: User;
  service: AppointmentService;
  company: AppointmentCompany;
}

export interface CompanyStats {
  totalServices: number;
  totalRevenue: number;
}

export interface CompanyDashboardData {
  hasAccess: boolean;
  plan: string;
  requiresUpgrade: boolean;
  appointmentsStats: AppointmentStats;
  upcomingAppointments: UpcomingAppointment[];
  stats: CompanyStats;
}

export interface ClientDashboardData {
  appointmentsStats: AppointmentStats;
  upcomingAppointments: UpcomingAppointment[];
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

