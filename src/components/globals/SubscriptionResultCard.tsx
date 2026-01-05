'use client';

import { useRouter } from 'next/navigation';
import { CheckCircle, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useTranslation } from 'react-i18next';

interface SubscriptionResultCardProps {
  type: 'success' | 'cancel';
}

const CONFIG = {
  success: {
    icon: CheckCircle,
    iconBgColor: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  cancel: {
    icon: XCircle,
    iconBgColor: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
};

export function SubscriptionResultCard({ type }: SubscriptionResultCardProps) {
  const router = useRouter();
  const { t } = useTranslation('subscription');
  
  const { icon: Icon, iconBgColor, iconColor } = CONFIG[type];

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
          <div
            className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full ${iconBgColor}`}
          >
            <Icon className={`h-10 w-10 ${iconColor}`} />
          </div>
          <CardTitle className="text-2xl">
            {t(`result.${type}.title`)}
          </CardTitle>
          <CardDescription>{t(`result.${type}.description`)}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="bg-muted rounded-lg p-4 space-y-2">
            <p className="text-sm text-muted-foreground">
              {t(`result.${type}.message1`)}
            </p>
            <p className="text-sm text-muted-foreground">
              {t(`result.${type}.message2`)}
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col gap-2">
          <Button
            onClick={() => router.push('/company/settings')}
            variant="outline"
            className="w-full"
          >
            {t('result.backToSettings')}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
