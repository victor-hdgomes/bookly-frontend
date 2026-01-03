import { useState, useEffect } from "react";

interface UseDebouncedValueOptions {
  delay?: number;
  onDebounce?: () => void;
}

export function useDebouncedValue<T>(
  initialValue: T,
  options: UseDebouncedValueOptions = {}
) {
  const { delay = 500, onDebounce } = options;
  const [inputValue, setInputValue] = useState<T>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<T>(initialValue);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(inputValue);
      onDebounce?.();
    }, delay);

    return () => clearTimeout(timer);
  }, [inputValue, delay, onDebounce]);

  return {
    value: inputValue,
    debouncedValue,
    setValue: setInputValue,
  };
}
