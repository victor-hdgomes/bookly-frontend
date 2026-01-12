export const AUTH_QUERY_KEYS = {
  FETCH_AUTH: ['fetchAuth'] as const,
} as const;

export const AUTH_ENDPOINTS = {
  ME: 'auth/me',
  SIGN_OUT: 'auth/signout',
  REFRESH: 'auth/refresh',
} as const;

export const AUTH_ROUTES = {
  HOME: '/',
} as const;
