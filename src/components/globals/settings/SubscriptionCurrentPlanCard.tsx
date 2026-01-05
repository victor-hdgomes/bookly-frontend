'use client';

import { Subscription } from '@/types/subscription.types';
import { Card, CardContent } from '@/components/ui/card';
import { SubscriptionPlanHeader } from './SubscriptionPlanHeader';
import { SubscriptionPlanInfo } from './SubscriptionPlanInfo';
import { SubscriptionPlanPeriod } from './SubscriptionPlanPeriod';
import { SubscriptionPlanFeatures } from './SubscriptionPlanFeatures';
import { SubscriptionPlanActions } from './SubscriptionPlanActions';

interface SubscriptionCurrentPlanCardProps {
  subscription: Subscription;
  onCancelEndPeriod: () => void;
  onCancelImmediate: () => void;
  onReactivate: () => void;
  onDowngradeToFree: () => void;
  loading?: boolean;
}

export function SubscriptionCurrentPlanCard({
  subscription,
  onCancelEndPeriod,
  onCancelImmediate,
  onReactivate,
  onDowngradeToFree,
  loading = false,
}: SubscriptionCurrentPlanCardProps) {
  const hasActiveStripeSubscription = !!subscription.stripeSubscriptionId;
  const currentPlan = subscription.planConfig;

  return (
    <Card>
      <SubscriptionPlanHeader status={subscription.status} />

      <CardContent className="space-y-4">
        <SubscriptionPlanInfo
          plan={subscription.plan}
          planConfig={currentPlan}
        />

        {subscription.currentPeriodEnd && (
          <SubscriptionPlanPeriod
            currentPeriodEnd={new Date(subscription.currentPeriodEnd)}
            cancelAtPeriodEnd={subscription.cancelAtPeriodEnd}
          />
        )}

        {currentPlan && (
          <SubscriptionPlanFeatures features={currentPlan.features} />
        )}
      </CardContent>

      <SubscriptionPlanActions
        plan={subscription.plan}
        hasActiveStripeSubscription={hasActiveStripeSubscription}
        cancelAtPeriodEnd={subscription.cancelAtPeriodEnd}
        loading={loading}
        onCancelEndPeriod={onCancelEndPeriod}
        onCancelImmediate={onCancelImmediate}
        onReactivate={onReactivate}
        onDowngradeToFree={onDowngradeToFree}
      />
    </Card>
  );
}
