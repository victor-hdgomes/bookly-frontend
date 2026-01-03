export const CLIENT_ROUTES = {
  CLIENT_DASHBOARD: '/client/dashboard',
  CLIENT_PROFILE: '/client/profile',
  CLIENT_COMPANIES_SEARCH: '/client/companies',
} as const;

export const CLIENT_QUERY_KEYS = {
  CLIENT_COMPANIES_LIST: (page: number, search: string) => ['companies', 'list', page, search] as const,
} as const;

export const CLIENT_ENDPOINTS = {
  CLIENT_COMPANIES_LIST: '/companies',
} as const;
