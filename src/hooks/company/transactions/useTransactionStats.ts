import { useQuery } from '@tanstack/react-query';
import { api } from '@/api';
import { FinancialStats } from '@/types';
import { TRANSACTIONS_QUERY_KEYS } from '@/constants';

export const useTransactionStats = (
  companyId: string | undefined,
  startDate?: string,
  endDate?: string,
) => {
  return useQuery({
    queryKey: TRANSACTIONS_QUERY_KEYS.stats(companyId || '', startDate, endDate),
    queryFn: async () => {
      const params = new URLSearchParams();
      if (startDate) params.append('startDate', startDate);
      if (endDate) params.append('endDate', endDate);

      const { data } = await api.get<FinancialStats>(
        `/transactions/company/${companyId}/stats${params.toString() ? `?${params.toString()}` : ''}`,
      );
      return data;
    },
    enabled: !!companyId,
  });
};
