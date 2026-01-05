'use client';

import { useTranslation } from 'react-i18next';
import { Plan } from '@/types/subscription.types';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface SubscriptionPlanCardProps {
  plan: {
    plan: Plan;
    name: string;
    price: number;
    features: string[];
  };
  isCurrentPlan: boolean;
  currentPlanPrice: number;
  onSelect: (plan: Plan) => void;
  disabled?: boolean;
}

export function SubscriptionPlanCard({
  plan,
  isCurrentPlan,
  currentPlanPrice,
  onSelect,
  disabled = false,
}: SubscriptionPlanCardProps) {
  const { t } = useTranslation('settings');

  const isUpgrade = plan.price > currentPlanPrice;
  const isStarter = plan.plan === Plan.STARTER;

  const getButtonText = () => {
    if (isCurrentPlan) return t('subscription.currentPlan.currentButton');
    if (isUpgrade) return t('subscription.actions.upgrade');
    if (isStarter) return t('subscription.actions.downgradeToFree');
    return t('subscription.actions.select');
  };

  return (
    <Card className={isCurrentPlan ? 'border-primary' : ''}>
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>
          {plan.price > 0
            ? `R$ ${plan.price.toFixed(2)}${t('subscription.currentPlan.perMonth')}`
            : t('subscription.currentPlan.free')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-1 text-sm">
          {plan.features.map((feature, index) => (
            <li key={index} className="text-muted-foreground">
              • {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        {isCurrentPlan ? (
          <Button disabled className="w-full" size="sm">
            {getButtonText()}
          </Button>
        ) : (
          <Button
            onClick={() => onSelect(plan.plan)}
            variant={isStarter ? 'outline' : 'default'}
            className="w-full"
            size="sm"
            disabled={disabled}
          >
            {getButtonText()}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
