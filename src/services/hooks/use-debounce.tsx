import { useEffect, useCallback } from 'react';

export default function useDebounce(effect: Function, dependencies: any[], delay: number): void {
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const callback: Function = useCallback(effect, dependencies);
  
  useEffect(() => {
    const timeout: number = setTimeout(callback, delay);
    return () => clearTimeout(timeout);
  }, [callback, delay]);
}