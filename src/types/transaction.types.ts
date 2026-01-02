export enum TransactionType {
  INCOME = 'INCOME',
  EXPENSE = 'EXPENSE',
}

export interface TransactionCategory {
  id: string;
  name: string;
  type: TransactionType;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  _count?: {
    transactions: number;
  };
}

export interface Transaction {
  id: string;
  description: string;
  amount: number;
  type: TransactionType;
  date: string;
  notes?: string;
  companyId: string;
  categoryId?: string;
  appointmentId?: string;
  productId?: string;
  createdAt: string;
  updatedAt: string;
  category?: TransactionCategory;
  appointment?: {
    id: string;
    date: string;
    service: {
      id: string;
      name: string;
      price: number;
    };
    user: {
      firstName: string;
      lastName: string;
      displayName: string;
      email: string;
    };
  };
  product?: {
    id: string;
    name: string;
    price: number;
  };
}

export interface FinancialStats {
  income: number;
  expenses: number;
  balance: number;
  recentTransactions: Transaction[];
}

export interface CreateTransactionData {
  description: string;
  amount: number;
  type: TransactionType;
  date?: string;
  notes?: string;
  companyId: string;
  categoryId?: string;
  appointmentId?: string;
  productId?: string;
}

export interface UpdateTransactionData {
  description?: string;
  amount?: number;
  type?: TransactionType;
  date?: string;
  notes?: string;
  categoryId?: string;
}

export interface FilterTransactionsParams extends Record<string, unknown> {
  page?: number;
  limit?: number;
  type?: TransactionType;
  categoryId?: string;
  startDate?: string;
  endDate?: string;
  search?: string;
}

export interface CreateTransactionCategoryData {
  name: string;
  type: TransactionType;
  companyId: string;
}

export interface UpdateTransactionCategoryData {
  name?: string;
  type?: TransactionType;
}
