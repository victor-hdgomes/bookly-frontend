import { useTranslation } from 'react-i18next';
import { Plan } from '@/types/subscription.types';
import { Button } from '@/components/ui/button';
import { CardFooter } from '@/components/ui/card';

interface SubscriptionPlanActionsProps {
  plan: Plan;
  hasActiveStripeSubscription: boolean;
  cancelAtPeriodEnd: boolean;
  loading?: boolean;
  onCancelEndPeriod: () => void;
  onCancelImmediate: () => void;
  onReactivate: () => void;
  onDowngradeToFree: () => void;
}

export function SubscriptionPlanActions({
  plan,
  hasActiveStripeSubscription,
  cancelAtPeriodEnd,
  loading = false,
  onCancelEndPeriod,
  onCancelImmediate,
  onReactivate,
  onDowngradeToFree,
}: SubscriptionPlanActionsProps) {
  const { t } = useTranslation('settings');
  const isPaidPlan = plan !== Plan.STARTER;

  return (
    <CardFooter className="flex flex-wrap gap-2">
      {isPaidPlan && hasActiveStripeSubscription && !cancelAtPeriodEnd && (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onCancelEndPeriod}
            disabled={loading}
          >
            {t('subscription.actions.cancelEndPeriod')}
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={onCancelImmediate}
            disabled={loading}
          >
            {t('subscription.actions.cancelImmediate')}
          </Button>
        </div>
      )}

      {isPaidPlan && hasActiveStripeSubscription && cancelAtPeriodEnd && (
        <Button onClick={onReactivate} size="sm" disabled={loading}>
          {t('subscription.actions.reactivate')}
        </Button>
      )}

      {isPaidPlan && !cancelAtPeriodEnd && (
        <Button
          variant="outline"
          size="sm"
          onClick={onDowngradeToFree}
          disabled={loading}
        >
          {t('subscription.actions.downgradeToFree')}
        </Button>
      )}
    </CardFooter>
  );
}
