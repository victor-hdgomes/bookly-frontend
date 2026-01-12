'use client';

import { Suspense } from 'react';
import { SubscriptionResultCard } from '@/components/globals/SubscriptionResultCard';
import { LoadingSpinner } from '@/components/states';

function SuccessContent() {
  return <SubscriptionResultCard type="success" />;
}

export default function SubscriptionSuccessPage() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <SuccessContent />
    </Suspense>
  );
}
