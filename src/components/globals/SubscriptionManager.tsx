'use client';

import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSubscription } from '@/hooks/useSubscription';
import { useSubscriptionDialogs } from '@/hooks/useSubscriptionDialogs';
import { LoadingState, NoSubscriptionState } from '@/components/states';
import { ConfirmDialog } from '@/components/globals/ConfirmDialog';
import { SubscriptionCurrentPlanCard } from './settings/SubscriptionCurrentPlanCard';
import { SubscriptionPlansList } from './settings/SubscriptionPlansList';

interface SubscriptionManagerProps {
  companyId: string;
}

export function SubscriptionManager({ companyId }: SubscriptionManagerProps) {
  const { t } = useTranslation('settings');
  
  const {
    loading,
    subscription,
    plans,
    fetchSubscription,
    fetchPlans,
    cancelSubscription,
    reactivateSubscription,
    downgradeToStarter,
    changePlan,
  } = useSubscription(companyId);

  const {
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
  } = useSubscriptionDialogs(subscription, plans);

  useEffect(() => {
    fetchSubscription();
    fetchPlans();
  }, [fetchSubscription, fetchPlans]);

  const handleConfirmCancel = async () => {
    const isImmediate = cancelType === 'immediate';
    await cancelSubscription(!isImmediate);
    closeCancelDialog();
  };

  const handleConfirmDowngrade = async () => {
    await downgradeToStarter();
    closeDowngradeDialog();
  };

  const handleConfirmChangePlan = async () => {
    if (selectedPlan) {
      await changePlan(selectedPlan);
    }
    closeChangePlanDialog();
  };

  if (loading && !subscription) {
    return <LoadingState message={t('subscription.loading')} minHeight="400px" />;
  }

  if (!subscription) {
    return <NoSubscriptionState message={t('subscription.notFound')} />;
  }

  return (
    <div className="space-y-6">
      <ConfirmDialog
        open={cancelDialogOpen}
        onOpenChange={closeCancelDialog}
        onConfirm={handleConfirmCancel}
        {...getCancelDialogContent()}
        variant="destructive"
        isPending={loading}
      />

      <ConfirmDialog
        open={downgradeDialogOpen}
        onOpenChange={closeDowngradeDialog}
        onConfirm={handleConfirmDowngrade}
        title={t('subscription.dialogs.downgrade.title')}
        description={t('subscription.dialogs.downgrade.description')}
        confirmText={t('subscription.dialogs.downgrade.confirm')}
        variant="destructive"
        isPending={loading}
      />

      <ConfirmDialog
        open={changePlanDialogOpen}
        onOpenChange={closeChangePlanDialog}
        onConfirm={handleConfirmChangePlan}
        {...getChangePlanDialogContent()}
        isPending={loading}
      />

      <SubscriptionCurrentPlanCard
        subscription={subscription}
        onCancelEndPeriod={() => openCancelDialog('end-period')}
        onCancelImmediate={() => openCancelDialog('immediate')}
        onReactivate={reactivateSubscription}
        onDowngradeToFree={openDowngradeDialog}
        loading={loading}
      />

      <SubscriptionPlansList
        plans={plans}
        currentPlan={subscription.plan}
        currentPlanPrice={subscription.planConfig?.price ?? 0}
        onSelectPlan={openChangePlanDialog}
        loading={loading}
      />
    </div>
  );
}
