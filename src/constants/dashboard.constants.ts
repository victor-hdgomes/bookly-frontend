export const DASHBOARD_QUERY_KEYS = {
  CLIENT_DASHBOARD: ['client-dashboard'] as const,
  COMPANY_DASHBOARD: (companyId: string) => ['companyDashboard', companyId] as const,
} as const;

export const DASHBOARD_ENDPOINTS = {
  CLIENT_DASHBOARD: '/auth/dashboard',
  COMPANY_DASHBOARD: (companyId: string) => `companies/${companyId}/dashboard`,
} as const;

