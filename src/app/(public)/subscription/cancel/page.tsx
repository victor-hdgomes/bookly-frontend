'use client';

import { Suspense } from 'react';
import { SubscriptionResultCard } from '@/components/globals/SubscriptionResultCard';
import { LoadingSpinner } from '@/components/states';

function CancelContent() {
  return <SubscriptionResultCard type="cancel" />;
}

export default function SubscriptionCancelPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <CancelContent />
    </Suspense>
  );
}
