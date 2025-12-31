export const AUTH_QUERY_KEYS = {
  FETCH_AUTH: ['fetchAuth'] as const,
} as const;

export const AUTH_ENDPOINTS = {
  ME: 'auth/me',
  SIGN_OUT: 'auth/signout',
} as const;

export const AUTH_ROUTES = {
  HOME: '/',
  DASHBOARD: '/panel/company/dashboard',
} as const;

