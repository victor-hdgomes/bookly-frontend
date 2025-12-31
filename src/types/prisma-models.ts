export enum AuthProvider {
  GOOGLE = "GOOGLE",
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  phone?: string | null;
  address?: string | null;
  status: CompanyStatus;
  timezone?: string | null;
  stripeCustomerId?: string | null;
  workingHours: string[];
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export enum CompanyStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  SUSPENDED = "SUSPENDED",
}

export interface User {
  id?: string;
  googleId?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  displayName?: string | null;
  email?: string;
  photo?: string | null;
  provider?: AuthProvider;
  password?: string | null;
  createdAt?: string;
  updatedAt?: string;
  companies?: Company[];
}
