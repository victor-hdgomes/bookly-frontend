export const CLIENT_ROUTES = {
  CLIENT_DASHBOARD: '/client/dashboard',
  CLIENT_PROFILE: '/client/profile',
  CLIENT_COMPANIES_SEARCH: '/client/companies',
  CLIENT_COMPANY_DETAILS: (slug: string) => `/client/companies/${slug}`,
} as const;

export const CLIENT_QUERY_KEYS = {
  CLIENT_COMPANIES_LIST: (page: number, search: string) => ['companies', 'list', page, search] as const,
  CLIENT_COMPANY_DETAIL: (slug: string) => ['company', 'detail', slug] as const,
  CLIENT_COMPANY_SERVICES: (slug: string) => ['company', 'services', slug] as const,
  CLIENT_COMPANY_EMPLOYEES: (slug: string) => ['company', 'employees', slug] as const,
  CLIENT_COMPANY_AVAILABLE_SLOTS: (slug: string, date: string | null, serviceId: string | null, employeeId: string | null) => 
    ['company', 'available-slots', slug, date, serviceId, employeeId] as const,
  CLIENT_APPOINTMENTS: ['appointments'] as const,
} as const;

export const CLIENT_ENDPOINTS = {
  CLIENT_COMPANIES_LIST: '/companies',
  CLIENT_COMPANY_DETAIL: (slug: string) => `/companies/${slug}`,
  CLIENT_COMPANY_SERVICES: (slug: string) => `/companies/${slug}/service-groups`,
  CLIENT_COMPANY_EMPLOYEES: (slug: string) => `/companies/${slug}/employees`,
  CLIENT_COMPANY_AVAILABLE_SLOTS: (slug: string) => `/companies/${slug}/available-slots`,
  CLIENT_APPOINTMENTS: '/appointments',
} as const;
