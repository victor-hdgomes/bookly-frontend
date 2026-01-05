import { useTranslation } from 'react-i18next';

interface SubscriptionPlanFeaturesProps {
  features: string[];
}

export function SubscriptionPlanFeatures({ features }: SubscriptionPlanFeaturesProps) {
  const { t } = useTranslation('settings');

  return (
    <div className="pt-4 border-t">
      <h4 className="font-medium mb-2">
        {t('subscription.currentPlan.features')}
      </h4>
      <ul className="space-y-1 text-sm text-muted-foreground">
        {features.map((feature, index) => (
          <li key={index}>• {feature}</li>
        ))}
      </ul>
    </div>
  );
}
