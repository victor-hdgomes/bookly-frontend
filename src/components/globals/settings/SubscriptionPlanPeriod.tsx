import { useTranslation } from 'react-i18next';
import { useDateFormat } from '@/hooks';

interface SubscriptionPlanPeriodProps {
  currentPeriodEnd: Date;
  cancelAtPeriodEnd: boolean;
}

export function SubscriptionPlanPeriod({
  currentPeriodEnd,
  cancelAtPeriodEnd,
}: SubscriptionPlanPeriodProps) {
  const { t } = useTranslation('settings');
  const { formatLongDate } = useDateFormat();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm">
        <span className="text-muted-foreground">
          {cancelAtPeriodEnd
            ? t('subscription.currentPlan.validUntil')
            : t('subscription.currentPlan.nextBilling')}
        </span>
        <span className="font-medium">
          {formatLongDate(currentPeriodEnd)}
        </span>
      </div>
      {cancelAtPeriodEnd && (
        <p className="text-sm text-amber-600 dark:text-amber-400">
          {t('subscription.currentPlan.cancelWarning')}
        </p>
      )}
    </div>
  );
}
