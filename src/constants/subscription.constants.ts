import { Plan, SubscriptionStatus } from '@/types/subscription.types';
import { TFunction } from 'i18next';

export const SUBSCRIPTION_ROUTES = {
  PLANS: '/subscriptions/plans',
  COMPANY_SUBSCRIPTION: (companyId: string) => `/subscriptions/company/${companyId}`,
  CHECKOUT: (companyId: string) => `/subscriptions/checkout/${companyId}`,
  CANCEL: (companyId: string) => `/subscriptions/cancel/${companyId}`,
  REACTIVATE: (companyId: string) => `/subscriptions/reactivate/${companyId}`,
  CHANGE_PLAN: (companyId: string) => `/subscriptions/change-plan/${companyId}`,
  LIMITS: (companyId: string) => `/subscriptions/limits/${companyId}`,
} as const;

export const getPlanName = (plan: Plan, t: TFunction): string => {
  const planKeys: Record<Plan, string> = {
    [Plan.STARTER]: 'plans.starter',
    [Plan.PRO]: 'plans.pro',
    [Plan.PREMIUM]: 'plans.premium',
  };
  return t(planKeys[plan]);
};

export const getSubscriptionStatusLabel = (status: SubscriptionStatus, t: TFunction): string => {
  const statusKeys: Record<SubscriptionStatus, string> = {
    [SubscriptionStatus.ACTIVE]: 'status.active',
    [SubscriptionStatus.CANCELED]: 'status.canceled',
    [SubscriptionStatus.PAST_DUE]: 'status.pastDue',
    [SubscriptionStatus.TRIALING]: 'status.trialing',
    [SubscriptionStatus.INCOMPLETE]: 'status.incomplete',
  };
  return t(statusKeys[status]);
};

export const SUBSCRIPTION_STATUS_COLORS: Record<SubscriptionStatus, string> = {
  [SubscriptionStatus.ACTIVE]: 'green',
  [SubscriptionStatus.CANCELED]: 'gray',
  [SubscriptionStatus.PAST_DUE]: 'red',
  [SubscriptionStatus.TRIALING]: 'blue',
  [SubscriptionStatus.INCOMPLETE]: 'yellow',
};
