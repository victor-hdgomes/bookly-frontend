import { AppointmentStatus } from '@/types/appointment.types';

export const APPOINTMENTS_QUERY_KEYS = {
  APPOINTMENTS: ['appointments'] as const,
  APPOINTMENTS_BY_COMPANY: (
    companyId: string,
    page?: number,
    limit?: number,
    status?: AppointmentStatus,
    serviceId?: string,
    userId?: string,
    startDate?: string,
    endDate?: string,
    search?: string,
  ) => ['appointments', companyId, page, limit, status, serviceId, userId, startDate, endDate, search] as const,
  APPOINTMENT_BY_ID: (id: string) => ['appointments', id] as const,
} as const;

export const APPOINTMENTS_ENDPOINTS = {
  LIST_BY_COMPANY: (companyId: string) => `/appointments/${companyId}`,
  CREATE: '/appointments',
  UPDATE: (appointmentId: string) => `/appointments/${appointmentId}`,
  DELETE: (appointmentId: string) => `/appointments/${appointmentId}`,
} as const;

export const APPOINTMENT_STATUS_LABELS = {
  [AppointmentStatus.SCHEDULED]: 'status.scheduled',
  [AppointmentStatus.COMPLETED]: 'status.completed',
  [AppointmentStatus.CANCELED]: 'status.canceled',
} as const;

export const APPOINTMENT_STATUS_COLORS = {
  [AppointmentStatus.SCHEDULED]: 'blue',
  [AppointmentStatus.COMPLETED]: 'green',
  [AppointmentStatus.CANCELED]: 'red',
} as const;
