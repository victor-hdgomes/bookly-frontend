export const SERVICE_GROUPS_QUERY_KEYS = {
    SERVICE_GROUPS: ['service-groups'] as const,
    SERVICE_GROUP_BY_ID: (id: string) => ['service-groups', id] as const,
} as const;

export const SERVICE_GROUPS_ENDPOINTS = {
    LIST: '/service-groups',
    CREATE: '/service-groups',
    UPDATE: (id: string) => `/service-groups/${id}`,
    DELETE: (id: string) => `/service-groups/${id}`,
} as const;

export const SERVICES_QUERY_KEYS = {
    SERVICES: ['services'] as const,
    SERVICES_BY_COMPANY: (companyId: string) => ['services', companyId] as const,
    SERVICE_BY_ID: (id: string) => ['services', id] as const,
} as const;

export const SERVICES_ENDPOINTS = {
    LIST_BY_COMPANY: (companyId: string) => `/services/${companyId}`,
    CREATE: '/services',
    UPDATE: (serviceId: string) => `/services/${serviceId}`,
    DELETE: (serviceId: string) => `/services/${serviceId}`,
} as const;
