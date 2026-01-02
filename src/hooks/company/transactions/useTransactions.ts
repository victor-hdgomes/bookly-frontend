import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '@/api';
import { useToast } from '@/hooks/useToast';
import { useTranslation } from 'react-i18next';
import {
  Transaction,
  CreateTransactionData,
  UpdateTransactionData,
  FilterTransactionsParams,
} from '@/types';
import { TRANSACTIONS_QUERY_KEYS } from '@/constants';
import { PaginatedResponse } from '@/types/dashboard.types';

export const useTransactions = (
  companyId: string | undefined,
  filters: FilterTransactionsParams = {},
) => {
  return useQuery({
    queryKey: TRANSACTIONS_QUERY_KEYS.list(companyId || '', filters),
    queryFn: async () => {
      const { data } = await api.get<PaginatedResponse<Transaction>>(
        `/transactions/company/${companyId}`,
        { params: filters },
      );
      return data;
    },
    enabled: !!companyId,
  });
};

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation('transactions');

  return useMutation({
    mutationFn: async (data: CreateTransactionData) => {
      const response = await api.post('/transactions', data);
      return response.data;
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: TRANSACTIONS_QUERY_KEYS.lists(),
      });
      queryClient.invalidateQueries({
        queryKey: TRANSACTIONS_QUERY_KEYS.stats(variables.companyId),
      });
      toast({
        title: t('toast.createSuccess'),
        variant: 'default',
      });
    },
    onError: () => {
      toast({
        title: t('toast.createError'),
        variant: 'destructive',
      });
    },
  });
};

export const useUpdateTransaction = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation('transactions');

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: UpdateTransactionData;
    }) => {
      const response = await api.patch(`/transactions/${id}`, data);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TRANSACTIONS_QUERY_KEYS.all,
      });
      toast({
        title: t('toast.updateSuccess'),
        variant: 'default',
      });
    },
    onError: () => {
      toast({
        title: t('toast.updateError'),
        variant: 'destructive',
      });
    },
  });
};

export const useDeleteTransaction = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const { t } = useTranslation('transactions');

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await api.delete(`/transactions/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: TRANSACTIONS_QUERY_KEYS.all,
      });
      toast({
        title: t('toast.deleteSuccess'),
        variant: 'default',
      });
    },
    onError: () => {
      toast({
        title: t('toast.deleteError'),
        variant: 'destructive',
      });
    },
  });
};
