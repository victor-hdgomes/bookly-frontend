'use client';

import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import { SubscriptionResultCard } from '@/components/globals/SubscriptionResultCard';

function SuccessContent() {
  return <SubscriptionResultCard type="success" />;
}

export default function SubscriptionSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
