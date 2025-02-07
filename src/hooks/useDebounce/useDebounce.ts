import { useCallback, useRef } from "react";

export function useDebounce<T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void {
  const inDebounce = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback(
    (...args: Parameters<T>) => {
      if (inDebounce.current) {
        clearTimeout(inDebounce.current);
      }
      inDebounce.current = setTimeout(() => func(...args), delay);
    },
    [func, delay]
  );

  return debounce;
};