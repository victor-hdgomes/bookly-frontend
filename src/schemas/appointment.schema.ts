import * as z from "zod";
import { AppointmentStatus } from "@/types/appointment.types";

export const createAppointmentSchema = z.object({
  date: z.string().min(1, "validation.dateRequired"),
  notes: z.string().optional(),
  serviceId: z.string().min(1, "validation.serviceRequired"),
  employeeId: z.string().optional(),
});

export type CreateAppointmentFormData = z.infer<typeof createAppointmentSchema>;

export const updateAppointmentSchema = z.object({
  date: z.string().optional(),
  notes: z.string().optional(),
  status: z.nativeEnum(AppointmentStatus).optional(),
  serviceId: z.string().optional(),
  employeeId: z.string().optional(),
});

export type UpdateAppointmentFormData = z.infer<typeof updateAppointmentSchema>;
