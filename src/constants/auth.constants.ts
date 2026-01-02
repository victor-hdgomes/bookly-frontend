export const AUTH_QUERY_KEYS = {
  FETCH_AUTH: ['fetchAuth'] as const,
} as const;

export const AUTH_ENDPOINTS = {
  ME: 'auth/me',
  SIGN_OUT: 'auth/signout',
} as const;

export const AUTH_ROUTES = {
  HOME: '/',
} as const;

export const CLIENT_ROUTES = {
  CLIENT_DASHBOARD: '/client/dashboard',
  CLIENT_PROFILE: '/client/profile',
} as const;

export const COMPANY_ROUTES = {
  COMPANY_DASHBOARD: '/company/dashboard',
  COMPANY_SERVICE_GROUPS: '/company/service-groups',
  COMPANY_SERVICES: '/company/services',
} as const;

