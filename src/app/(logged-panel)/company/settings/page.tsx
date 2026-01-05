'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, LucideIcon } from 'lucide-react';
import { SubscriptionSettings } from '@/components/globals/settings/SubscriptionSettings';
import { useSelectedCompanyContext } from '@/contexts/SelectedCompanyContext';
import { PageHeader } from '@/components/globals';
import { useTranslation } from 'react-i18next';
import { ComponentType } from 'react';

interface SettingsComponentProps {
  companyId?: string;
}

interface SettingsTab {
  value: string;
  icon: LucideIcon;
  translationKey: string;
  component: ComponentType<SettingsComponentProps>;
}

export default function CompanySettingsPage() {
  const { selectedCompany } = useSelectedCompanyContext();
  const { t } = useTranslation('settings');

  if (!selectedCompany) {
    return null;
  }

  const settingsTabs: SettingsTab[] = [
    {
      value: 'subscription',
      icon: CreditCard,
      translationKey: 'tabs.subscription',
      component: () => <SubscriptionSettings companyId={selectedCompany.id} />,
    },
  ];

  return (
    <div className="space-y-6">
      <PageHeader
        title={t('title')}
        description={t('subtitle')}
        showCompanySelector
      />

      <Tabs defaultValue="subscription" className="w-full">
        <TabsList className="grid w-full grid-cols-1">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2"
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{t(tab.translationKey)}</span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {settingsTabs.map((tab) => {
          const Component = tab.component;
          return (
            <TabsContent key={tab.value} value={tab.value} className="mt-6">
              <Component />
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
