import { useTranslation } from 'react-i18next';
import { SubscriptionStatus } from '@/types/subscription.types';
import { CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SubscriptionPlanHeaderProps {
  status: SubscriptionStatus;
}

export function SubscriptionPlanHeader({ status }: SubscriptionPlanHeaderProps) {
  const { t } = useTranslation('settings');

  const getStatusBadgeVariant = (status: SubscriptionStatus) => {
    switch (status) {
      case SubscriptionStatus.ACTIVE:
        return 'default';
      case SubscriptionStatus.CANCELED:
        return 'secondary';
      case SubscriptionStatus.PAST_DUE:
        return 'destructive';
      case SubscriptionStatus.TRIALING:
        return 'outline';
      default:
        return 'secondary';
    }
  };

  return (
    <CardHeader>
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>{t('subscription.currentPlan.title')}</CardTitle>
          <CardDescription>
            {t('subscription.currentPlan.description')}
          </CardDescription>
        </div>
        <Badge variant={getStatusBadgeVariant(status)}>
          {t(`status.${status.toLowerCase()}`)}
        </Badge>
      </div>
    </CardHeader>
  );
}
