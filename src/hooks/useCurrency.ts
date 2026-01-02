import { useCallback } from "react";

export function useCurrency() {
  const formatCurrency = useCallback((value: number): string => {
    return `R$ ${value.toFixed(2)}`;
  }, []);

  return { formatCurrency };
}
