export const TRANSACTIONS_QUERY_KEYS = {
  all: ['transactions'] as const,
  lists: () => [...TRANSACTIONS_QUERY_KEYS.all, 'list'] as const,
  list: (companyId: string, filters: Record<string, unknown>) =>
    [...TRANSACTIONS_QUERY_KEYS.lists(), companyId, filters] as const,
  stats: (companyId: string, startDate?: string, endDate?: string) =>
    [...TRANSACTIONS_QUERY_KEYS.all, 'stats', companyId, startDate, endDate] as const,
};

export const TRANSACTION_CATEGORIES_QUERY_KEYS = {
  all: ['transaction-categories'] as const,
  lists: () => [...TRANSACTION_CATEGORIES_QUERY_KEYS.all, 'list'] as const,
  list: (companyId: string, type?: string) =>
    [...TRANSACTION_CATEGORIES_QUERY_KEYS.lists(), companyId, type] as const,
};

export const DEFAULT_TRANSACTION_LIMIT = 10;
