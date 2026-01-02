"use client";

import { useAuth } from "@/hooks/client/profile/useAuth";
import { SelectedCompanyProvider } from "@/contexts/SelectedCompanyContext";

export default function CompanyLayout({ children }: { children: React.ReactNode }) {
  const { data: user } = useAuth();

  return (
    <SelectedCompanyProvider companies={user?.companies}>
      {children}
    </SelectedCompanyProvider>
  );
}
