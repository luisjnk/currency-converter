import { useCallback, useRef } from "react";

export function useDebounce(func, delay) {
  const inDebounce = useRef<NodeJS.Timeout | null>(null);

  const debounce = useCallback(
    (...args) => {
      clearTimeout(inDebounce.current);
      inDebounce.current = setTimeout(() => func(...args), delay);
    },
    [func, delay]
  );

  return debounce;
};