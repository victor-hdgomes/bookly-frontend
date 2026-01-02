import * as z from "zod";

export const createServiceGroupSchema = z.object({
  name: z.string().min(3, "validation.nameMinLength"),
});

export type CreateServiceGroupFormData = z.infer<typeof createServiceGroupSchema>;
