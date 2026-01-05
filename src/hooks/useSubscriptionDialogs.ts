import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Plan, PlanConfig, Subscription } from '@/types/subscription.types';
import { useDateLocale } from '@/hooks';
import { format } from 'date-fns';

type CancelDialogType = 'immediate' | 'end-period' | null;

export function useSubscriptionDialogs(
  subscription: Subscription | null,
  plans: PlanConfig[]
) {
  const { t } = useTranslation('settings');
  const dateLocale = useDateLocale();
  
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [cancelType, setCancelType] = useState<CancelDialogType>(null);
  const [downgradeDialogOpen, setDowngradeDialogOpen] = useState(false);
  const [changePlanDialogOpen, setChangePlanDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);

  const formatDate = (date: Date) => {
    return format(date, "dd 'de' MMMM 'de' yyyy", {
      locale: dateLocale,
    });
  };

  const openCancelDialog = (type: 'immediate' | 'end-period') => {
    setCancelType(type);
    setCancelDialogOpen(true);
  };

  const closeCancelDialog = () => {
    setCancelDialogOpen(false);
    setCancelType(null);
  };

  const openDowngradeDialog = () => setDowngradeDialogOpen(true);
  const closeDowngradeDialog = () => setDowngradeDialogOpen(false);

  const openChangePlanDialog = (plan: Plan) => {
    setSelectedPlan(plan);
    setChangePlanDialogOpen(true);
  };

  const closeChangePlanDialog = () => {
    setChangePlanDialogOpen(false);
    setSelectedPlan(null);
  };

  const getCancelDialogContent = () => {
    if (cancelType === 'immediate') {
      return {
        title: t('subscription.dialogs.cancelImmediate.title'),
        description: t('subscription.dialogs.cancelImmediate.description'),
        confirmText: t('subscription.dialogs.cancelImmediate.confirm'),
      };
    }

    if (cancelType === 'end-period') {
      const description = subscription?.currentPeriodEnd
        ? t('subscription.dialogs.cancelEndPeriod.description', {
            date: formatDate(subscription.currentPeriodEnd),
          })
        : t('subscription.dialogs.cancelEndPeriod.descriptionNoDate');

      return {
        title: t('subscription.dialogs.cancelEndPeriod.title'),
        description,
        confirmText: t('subscription.dialogs.cancelEndPeriod.confirm'),
      };
    }

    return {
      title: t('confirmDialog.title'),
      description: t('confirmDialog.description'),
      confirmText: t('confirmDialog.confirm'),
    };
  };

  const getChangePlanDialogContent = () => {
    if (!selectedPlan) {
      return {
        title: t('confirmDialog.title'),
        description: t('confirmDialog.description'),
        confirmText: t('confirmDialog.confirm'),
      };
    }

    const planName = t(`plans.${selectedPlan.toLowerCase()}`);
    const currentPlanConfig = plans.find((p) => p.plan === subscription?.plan);
    const newPlanConfig = plans.find((p) => p.plan === selectedPlan);

    if (selectedPlan === Plan.STARTER) {
      return {
        title: t('subscription.dialogs.downgrade.title'),
        description: t('subscription.dialogs.downgrade.description'),
        confirmText: t('subscription.dialogs.downgrade.confirm'),
      };
    }

    const isUpgrade = newPlanConfig && currentPlanConfig && newPlanConfig.price > currentPlanConfig.price;
    const isDowngrade = newPlanConfig && currentPlanConfig && newPlanConfig.price < currentPlanConfig.price;

    if (isUpgrade) {
      return {
        title: t('subscription.dialogs.changePlanUpgrade.title', { plan: planName }),
        description: t('subscription.dialogs.changePlanUpgrade.description', {
          plan: planName,
          price: newPlanConfig.price.toFixed(2),
        }),
        confirmText: t('subscription.dialogs.changePlanUpgrade.confirm'),
      };
    }

    if (isDowngrade) {
      return {
        title: t('subscription.dialogs.changePlanDowngrade.title', { plan: planName }),
        description: t('subscription.dialogs.changePlanDowngrade.description', {
          plan: planName,
        }),
        confirmText: t('subscription.dialogs.changePlanDowngrade.confirm'),
      };
    }

    return {
      title: t('subscription.dialogs.changePlan.title', { plan: planName }),
      description: t('subscription.dialogs.changePlan.description', {
        plan: planName,
      }),
      confirmText: t('subscription.dialogs.changePlan.confirm'),
    };
  };

  return {
    cancelDialogOpen,
    cancelType,
    downgradeDialogOpen,
    changePlanDialogOpen,
    selectedPlan,
    
    openCancelDialog,
    closeCancelDialog,
    openDowngradeDialog,
    closeDowngradeDialog,
    openChangePlanDialog,
    closeChangePlanDialog,
    
    getCancelDialogContent,
    getChangePlanDialogContent,
  };
}
