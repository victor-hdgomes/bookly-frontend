export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED',
}

export interface Appointment {
  id: string;
  date: string;
  status: AppointmentStatus;
  notes: string | null;
  createdAt: string;
  updatedAt: string;
  companyId: string;
  serviceId: string;
  userId: string;
  service: {
    id: string;
    name: string;
    price: number;
    duration: number;
    discount: number;
    isActive: boolean;
    serviceGroup: {
      id: string;
      name: string;
    };
  };
  user: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    displayName: string | null;
    email: string;
    photo: string | null;
  };
}

export interface CreateAppointmentPayload {
  date: string;
  notes?: string;
  companyId: string;
  serviceId: string;
  employeeId?: string;
}

export interface UpdateAppointmentPayload {
  date?: string;
  notes?: string;
  status?: AppointmentStatus;
  serviceId?: string;
  userId?: string;
}

export interface AppointmentsResponse {
  data: Appointment[];
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
  };
}

export interface FilterAppointmentsParams {
  status?: AppointmentStatus;
  serviceId?: string;
  userId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}
