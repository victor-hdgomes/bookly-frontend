'use client';

import { SubscriptionManager } from '@/components/globals/SubscriptionManager';

interface SubscriptionSettingsProps {
  companyId: string;
}

export function SubscriptionSettings({ companyId }: SubscriptionSettingsProps) {
  return <SubscriptionManager companyId={companyId} />;
}
