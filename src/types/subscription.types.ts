export enum Plan {
  STARTER = 'STARTER',
  PRO = 'PRO',
  PREMIUM = 'PREMIUM',
}

export enum SubscriptionStatus {
  ACTIVE = 'ACTIVE',
  CANCELED = 'CANCELED',
  PAST_DUE = 'PAST_DUE',
  TRIALING = 'TRIALING',
  INCOMPLETE = 'INCOMPLETE',
}

export interface PlanConfig {
  plan: Plan;
  name: string;
  stripeProductId: string;
  stripePriceId: string;
  price: number;
  currency: string;
  maxEmployees: number;
  hasDashboard: boolean;
  maxDashboards: number;
  features: string[];
  isPopular?: boolean;
  discount?: {
    percentage: number;
    label: string;
  };
}

export interface Subscription {
  id: string;
  status: SubscriptionStatus;
  plan: Plan;
  stripeSubscriptionId: string | null;
  stripePriceId: string;
  stripeProductId: string;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  canceledAt: Date | null;
  trialEnd: Date | null;
  maxEmployees: number;
  hasDashboard: boolean;
  maxDashboards: number;
  companyId: string;
  createdAt: Date;
  updatedAt: Date;
  planConfig?: PlanConfig;
}
