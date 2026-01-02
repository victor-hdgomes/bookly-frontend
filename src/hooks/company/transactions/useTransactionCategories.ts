import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api';
import { useToast } from '@/hooks/useToast';
import { useTranslation } from 'react-i18next';
import {
  TransactionCategory,
  CreateTransactionCategoryData,
  UpdateTransactionCategoryData,
  TransactionType,
} from '@/types';
import { TRANSACTION_CATEGORIES_QUERY_KEYS, TRANSACTIONS_QUERY_KEYS } from '@/constants';

export const useTransactionCategories = (
  companyId: string | undefined,
  type?: TransactionType,
) => {
  return useQuery({
    queryKey: TRANSACTION_CATEGORIES_QUERY_KEYS.list(companyId || '', type),
    queryFn: async () => {
      const params = type ? `?type=${type}` : '';
      const { data } = await api.get<TransactionCategory[]>(
        `/transaction-categories/company/${companyId}${params}`,
      );
      return data;
    },
    enabled: !!companyId,
  });
};

export const useCreateTransactionCategory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation('transactions');

  return useMutation({
    mutationFn: async (data: CreateTransactionCategoryData) => {
      const response = await api.post('/transaction-categories', data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TRANSACTION_CATEGORIES_QUERY_KEYS.all,
      });
      toast({
        title: t('categories.toast.createSuccess'),
        variant: 'default',
      });
    },
    onError: () => {
      toast({
        title: t('categories.toast.createError'),
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateTransactionCategory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation('transactions');

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateTransactionCategoryData;
    }) => {
      const response = await api.patch(`/transaction-categories/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TRANSACTION_CATEGORIES_QUERY_KEYS.all,
      });
      toast({
        title: t('categories.toast.updateSuccess'),
        variant: 'default',
      });
    },
    onError: () => {
      toast({
        title: t('categories.toast.updateError'),
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteTransactionCategory = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation('transactions');

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/transaction-categories/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TRANSACTION_CATEGORIES_QUERY_KEYS.all,
      });
      queryClient.invalidateQueries({
        queryKey: TRANSACTIONS_QUERY_KEYS.all,
      });
      toast({
        title: t('categories.toast.deleteSuccess'),
        variant: 'default',
      });
    },
    onError: () => {
      toast({
        title: t('categories.toast.deleteError'),
        variant: 'destructive',
      });
    },
  });
};
