'use client';

import { useEffect, useState, useCallback } from 'react';
import { api } from '@/api';
import { Plan, PlanConfig } from '@/types/subscription.types';
import { SUBSCRIPTION_ROUTES } from '@/constants/subscription.constants';

export interface SubscriptionLimits {
  hasAccess: boolean;
  plan?: Plan;
  limits: {
    maxEmployees: number;
    hasDashboard: boolean;
    maxDashboards: number;
  };
  usage: {
    employeesCount: number;
  };
  canAddEmployee: boolean;
  canAccessDashboard: boolean;
  planConfig?: PlanConfig;
}

export function useSubscriptionLimits(companyId?: string) {
  const [limits, setLimits] = useState<SubscriptionLimits | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchLimits = useCallback(async () => {
    if (!companyId) return;

    setLoading(true);
    const response = await api.get(SUBSCRIPTION_ROUTES.LIMITS(companyId));
    setLimits(response.data);
    setLoading(false);
  }, [companyId]);

  useEffect(() => {
    fetchLimits();
  }, [fetchLimits]);

  const isAtLimit = (type: 'employees') => {
    if (!limits) return false;
    
    if (type === 'employees') {
      return limits.usage.employeesCount >= limits.limits.maxEmployees;
    }
    
    return false;
  };

  const getRemainingSlots = (type: 'employees') => {
    if (!limits) return 0;
    
    if (type === 'employees') {
      return Math.max(0, limits.limits.maxEmployees - limits.usage.employeesCount);
    }
    
    return 0;
  };

  return {
    limits,
    loading,
    fetchLimits,
    isAtLimit,
    getRemainingSlots,
    canAddEmployee: limits?.canAddEmployee ?? false,
    canAccessDashboard: limits?.canAccessDashboard ?? false,
  };
}
