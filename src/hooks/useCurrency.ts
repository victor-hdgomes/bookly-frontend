import { useCallback } from "react";

export enum Currency {
  BRL = 'BRL',
  USD = 'USD',
  EUR = 'EUR',
}

interface CurrencyConfig {
  symbol: string;
  locale: string;
  decimalPlaces: number;
}

const CURRENCY_CONFIGS: Record<Currency, CurrencyConfig> = {
  [Currency.BRL]: {
    symbol: 'R$',
    locale: 'pt-BR',
    decimalPlaces: 2,
  },
  [Currency.USD]: {
    symbol: '$',
    locale: 'en-US',
    decimalPlaces: 2,
  },
  [Currency.EUR]: {
    symbol: '€',
    locale: 'de-DE',
    decimalPlaces: 2,
  },
};

export function useCurrency(currency: Currency = Currency.BRL) {
  const formatCurrency = useCallback((value: number): string => {
    const config = CURRENCY_CONFIGS[currency];
    
    return new Intl.NumberFormat(config.locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: config.decimalPlaces,
      maximumFractionDigits: config.decimalPlaces,
    }).format(value);
  }, [currency]);

  const parseCurrency = useCallback((value: string): number => {
    const cleaned = value.replace(/[^\d,.-]/g, '');
    
    const normalized = cleaned.replace(',', '.');
    
    return parseFloat(normalized) || 0;
  }, []);

  return { 
    formatCurrency, 
    parseCurrency,
    currency,
  };
}
