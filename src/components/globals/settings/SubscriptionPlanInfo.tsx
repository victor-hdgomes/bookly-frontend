import { useTranslation } from 'react-i18next';
import { Plan, PlanConfig } from '@/types/subscription.types';

interface SubscriptionPlanInfoProps {
  plan: Plan;
  planConfig?: PlanConfig;
}

export function SubscriptionPlanInfo({ plan, planConfig }: SubscriptionPlanInfoProps) {
  const { t } = useTranslation('settings');

  return (
    <div>
      <h3 className="text-2xl font-bold">
        {t(`plans.${plan.toLowerCase()}`)}
      </h3>
      {planConfig && (
        <p className="text-muted-foreground">
          {planConfig.price > 0
            ? `R$ ${Number(planConfig.price).toFixed(2)}${t('subscription.currentPlan.perMonth')}`
            : t('subscription.currentPlan.free')}
        </p>
      )}
    </div>
  );
}
