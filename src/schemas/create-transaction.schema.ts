import { z } from 'zod';
import { TransactionType } from '@/types';
import i18n from '@/locales/i18n';

const t = (key: string) => i18n.t(key, { ns: 'transactions' });

export const createTransactionSchema = z.object({
  description: z.string().min(1, t('validation.descriptionRequired')).max(255, t('validation.descriptionMaxLength')),
  amount: z.number().positive(t('validation.amountPositive')),
  type: z.nativeEnum(TransactionType),
  date: z.string().optional(),
  notes: z.string().max(500, t('validation.notesMaxLength')).optional(),
  categoryId: z.string().uuid().optional(),
  appointmentId: z.string().uuid().optional(),
  productId: z.string().uuid().optional(),
});

export type CreateTransactionFormData = z.infer<typeof createTransactionSchema>;
