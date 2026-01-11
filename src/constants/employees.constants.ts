export const EMPLOYEES_QUERY_KEYS = {
  EMPLOYEES: ['employees'] as const,
  EMPLOYEES_BY_COMPANY: (companyId: string, page?: number, limit?: number, search?: string, showInactive?: boolean) => 
    ['employees', companyId, page, limit, search, showInactive] as const,
  EMPLOYEE_STATS: (companyId: string) => ['employee-stats', companyId] as const,
  SEARCH_USER: (email: string) => ['search-user', email] as const,
} as const;

export const EMPLOYEES_ENDPOINTS = {
  LIST_BY_COMPANY: (companyId: string) => `/employees/${companyId}`,
  CREATE: '/employees',
  UPDATE: (employeeId: string) => `/employees/${employeeId}`,
  TOGGLE_STATUS: (employeeId: string) => `/employees/${employeeId}/toggle-status`,
  DELETE: (employeeId: string) => `/employees/${employeeId}`,
  SEARCH_USER: '/employees/search-user',
  STATS: (companyId: string) => `/employees/company/${companyId}/stats`,
} as const;
