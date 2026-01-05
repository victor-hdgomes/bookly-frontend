'use client';

import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { subscriptionsApi, CreateCheckoutSessionDto } from '@/api/subscriptions.api';
import { Plan, Subscription, PlanConfig } from '@/types/subscription.types';
import { useToast } from '@/hooks/useToast';

export function useSubscription(companyId?: string) {
  const { t } = useTranslation('settings');
  const [loading, setLoading] = useState(false);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [plans, setPlans] = useState<PlanConfig[]>([]);
  const { toast } = useToast();

  const fetchSubscription = useCallback(async () => {
    if (!companyId) return;
    
    setLoading(true);
    const data = await subscriptionsApi.getSubscription(companyId);
    setSubscription(data);
    setLoading(false);
  }, [companyId]);

  const fetchPlans = useCallback(async () => {
    setLoading(true);
    const data = await subscriptionsApi.getPlans();
    setPlans(data);
    setLoading(false);
  }, []);

  const createCheckoutSession = useCallback(
    async (plan: Plan, couponId?: string) => {
      if (!companyId) {
        toast({
          title: t('errors.title'),
          description: t('errors.companyNotFound'),
          variant: 'destructive',
        });
        return;
      }

      if (plan === Plan.STARTER) {
        toast({
          title: t('subscription.messages.freePlan.title'),
          description: t('subscription.messages.freePlan.description'),
          variant: 'default',
        });
        return;
      }

      setLoading(true);
      const data: CreateCheckoutSessionDto = {
        plan,
        successUrl: `${window.location.origin}/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/subscription/cancel`,
        couponId,
      };

      const { url } = await subscriptionsApi.createCheckoutSession(companyId, data);

      if (url) {
        window.location.href = url;
      }
      setLoading(false);
    },
    [companyId, t, toast],
  );

  const cancelSubscription = useCallback(
    async (cancelAtPeriodEnd = true) => {
      if (!companyId) return;

      setLoading(true);
      await subscriptionsApi.cancelSubscription(companyId, cancelAtPeriodEnd);
      
      toast({
        title: t('subscription.messages.canceled.title'),
        description: cancelAtPeriodEnd
          ? t('subscription.messages.canceled.endPeriod')
          : t('subscription.messages.canceled.immediate'),
      });

      await fetchSubscription();
      setLoading(false);
    },
    [companyId, toast, t, fetchSubscription],
  );

  const reactivateSubscription = useCallback(async () => {
    if (!companyId) return;

    setLoading(true);
    await subscriptionsApi.reactivateSubscription(companyId);
    
    toast({
      title: t('subscription.messages.reactivated.title'),
      description: t('subscription.messages.reactivated.description'),
    });

    await fetchSubscription();
    setLoading(false);
  }, [companyId, toast, t, fetchSubscription]);

  const changePlan = useCallback(
    async (newPlan: Plan) => {
      if (!companyId) {
        toast({
          title: t('errors.title'),
          description: t('errors.companyNotFound'),
          variant: 'destructive',
        });
        return false;
      }

      setLoading(true);
      const result = await subscriptionsApi.changePlan(companyId, newPlan);

      if (result.requiresPayment) {
        toast({
          title: t('subscription.messages.paymentRequired.title'),
          description: t('subscription.messages.paymentRequired.description'),
        });
        await createCheckoutSession(newPlan);
        setLoading(false);
        return false;
      }

      if (result.success) {
        toast({
          title: t('subscription.messages.planChanged.title'),
          description: t('subscription.messages.planChanged.description'),
        });
        await fetchSubscription();
        setLoading(false);
        return true;
      }

      setLoading(false);
      return false;
    },
    [companyId, toast, t, createCheckoutSession, fetchSubscription],
  );

  const downgradeToStarter = useCallback(async () => {
    if (!companyId) {
      toast({
        title: t('errors.title'),
        description: t('errors.companyNotFound'),
        variant: 'destructive',
      });
      return false;
    }

    if (subscription?.plan === Plan.STARTER) {
      toast({
        title: t('subscription.messages.alreadyFree.title'),
        description: t('subscription.messages.alreadyFree.description'),
        variant: 'default',
      });
      return false;
    }

    setLoading(true);
    const result = await subscriptionsApi.changePlan(companyId, Plan.STARTER);

    if (result.success) {
      toast({
        title: t('subscription.messages.downgraded.title'),
        description: t('subscription.messages.downgraded.description'),
      });
      await fetchSubscription();
      setLoading(false);
      return true;
    }

    setLoading(false);
    return false;
  }, [companyId, subscription?.plan, toast, t, fetchSubscription]);

  return {
    loading,
    subscription,
    plans,
    fetchSubscription,
    fetchPlans,
    createCheckoutSession,
    cancelSubscription,
    reactivateSubscription,
    changePlan,
    downgradeToStarter,
  };
}
