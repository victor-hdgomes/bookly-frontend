import * as z from "zod";

export const createServiceSchema = z.object({
  name: z.string().min(3, "validation.nameMinLength"),
  price: z.number().min(0.01, "validation.priceMinValue"),
  duration: z.number().min(1, "validation.durationMinValue"),
  serviceGroupId: z.string().min(1, "validation.serviceGroupRequired"),
});

export type CreateServiceFormData = z.infer<typeof createServiceSchema>;
