import { api } from './index';
import { Plan, Subscription, PlanConfig } from '@/types/subscription.types';
import { SUBSCRIPTION_ROUTES } from '@/constants/subscription.constants';

export interface CreateCheckoutSessionDto {
  plan: Plan;
  successUrl: string;
  cancelUrl: string;
  couponId?: string;
}

export interface ChangePlanDto {
  plan: Plan;
}

export interface ChangePlanResponse {
  success: boolean;
  requiresPayment: boolean;
  message?: string;
}

export interface CheckoutSessionResponse {
  sessionId: string;
  url: string;
}

export const subscriptionsApi = {
  getPlans: async (): Promise<PlanConfig[]> => {
    const response = await api.get(SUBSCRIPTION_ROUTES.PLANS);
    return response.data;
  },

  getSubscription: async (companyId: string): Promise<Subscription> => {
    const response = await api.get(SUBSCRIPTION_ROUTES.COMPANY_SUBSCRIPTION(companyId));
    return response.data;
  },

  createCheckoutSession: async (
    companyId: string,
    data: CreateCheckoutSessionDto,
  ): Promise<CheckoutSessionResponse> => {
    const response = await api.post(SUBSCRIPTION_ROUTES.CHECKOUT(companyId), data);
    return response.data;
  },

  cancelSubscription: async (
    companyId: string,
    cancelAtPeriodEnd = true,
  ): Promise<{ success: boolean; cancelAtPeriodEnd: boolean }> => {
    const response = await api.delete(SUBSCRIPTION_ROUTES.CANCEL(companyId), {
      data: { cancelAtPeriodEnd },
    });
    return response.data;
  },

  reactivateSubscription: async (
    companyId: string,
  ): Promise<{ success: boolean }> => {
    const response = await api.post(SUBSCRIPTION_ROUTES.REACTIVATE(companyId));
    return response.data;
  },

  changePlan: async (
    companyId: string,
    plan: Plan,
  ): Promise<ChangePlanResponse> => {
    const response = await api.patch(
      SUBSCRIPTION_ROUTES.CHANGE_PLAN(companyId),
      { plan },
    );
    return response.data;
  },
};
