'use client';

import { useTranslation } from 'react-i18next';
import { Plan, PlanConfig } from '@/types/subscription.types';
import { SubscriptionPlanCard } from './SubscriptionPlanCard';

interface SubscriptionPlansListProps {
  plans: PlanConfig[];
  currentPlan: Plan;
  currentPlanPrice: number;
  onSelectPlan: (plan: Plan) => void;
  loading?: boolean;
}

export function SubscriptionPlansList({
  plans,
  currentPlan,
  currentPlanPrice,
  onSelectPlan,
  loading = false,
}: SubscriptionPlansListProps) {
  const { t } = useTranslation('settings');

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">
        {t('subscription.availablePlans.title')}
      </h3>
      <div className="grid gap-4 md:grid-cols-3">
        {plans.map((plan) => (
          <SubscriptionPlanCard
            key={plan.plan}
            plan={plan}
            isCurrentPlan={currentPlan === plan.plan}
            currentPlanPrice={currentPlanPrice}
            onSelect={onSelectPlan}
            disabled={loading}
          />
        ))}
      </div>
    </div>
  );
}
