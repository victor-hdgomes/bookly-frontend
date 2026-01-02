import * as z from "zod";

export const editServiceSchema = (t: (key: string) => string) => z.object({
  name: z.string().min(3, t("validation.nameMinLength")),
  price: z.coerce.number().min(0.01, t("validation.priceMinValue")),
  duration: z.coerce.number().min(1, t("validation.durationMinValue")),
  discount: z.coerce.number().min(0, t("validation.discountMinValue")).max(100, t("validation.discountMaxValue")),
  isActive: z.boolean(),
  serviceGroupId: z.string().min(1, t("validation.serviceGroupRequired")),
});

export type EditServiceFormData = z.infer<ReturnType<typeof editServiceSchema>>;
