"use client";

import { useAuth } from "@/hooks/client/profile/useAuth";
import ProfileContent from "@/app/(logged-panel)/client/profile/_components/ProfileContent/ProfileContent";
import { PageHeader } from "@/components/ui/page-header";
import { LoadingState, ErrorState } from "@/components/states";
import { useTranslation } from "react-i18next";

export default function Profile() {
  const { t } = useTranslation('profile');
  const { data: user, isLoading, error } = useAuth();

  if (isLoading) {
    return <LoadingState message={t('loading')} />;
  }

  if (error || !user) {
    return (
      <ErrorState
        title={t('error')}
        description={t('errorDescription')}
      />
    );
  }

  return (
    <div>
      <PageHeader title={t('title')} subtitle={t('subtitle')} />

      <ProfileContent user={user} />
    </div>
  );
}
