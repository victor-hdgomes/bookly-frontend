import { z } from 'zod';
import { TransactionType } from '@/types';
import i18n from '@/locales/i18n';

const t = (key: string) => i18n.t(key, { ns: 'transactions' });

export const createTransactionCategorySchema = z.object({
  name: z.string().min(1, t('validation.categoryNameRequired')).max(100, t('validation.categoryNameMaxLength')),
  type: z.nativeEnum(TransactionType),
});

export type CreateTransactionCategoryFormData = z.infer<typeof createTransactionCategorySchema>;
