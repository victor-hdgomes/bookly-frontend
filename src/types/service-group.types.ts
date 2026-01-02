export interface ServiceGroup {
  id: string;
  name: string;
  companyId: string;
  createdAt: string;
  updatedAt: string;
  services: Service[];
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration: number;
  discount: number;
  isActive: boolean;
  companyId: string;
  serviceGroupId: string;
  createdAt: string;
  updatedAt: string;
  serviceGroup?: {
    id: string;
    name: string;
  };
}

export interface CreateServiceGroupDto {
  name: string;
  companyId: string;
}

export interface CreateServiceDto {
  name: string;
  price: number;
  duration: number;
  companyId: string;
  serviceGroupId: string;
}

export interface UpdateServiceDto {
  name?: string;
  price?: number;
  duration?: number;
  discount?: number;
  isActive?: boolean;
  serviceGroupId?: string;
}

export interface ServiceGroupListResponse {
  data: ServiceGroup[];
  meta: {
    total: number;
    page: number;
    limit: number;
    lastPage: number;
  };
}
