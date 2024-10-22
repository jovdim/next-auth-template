import { useState, useEffect, useCallback } from 'react';

// Custom hook to manage countdown logic
export function useCountdown(initialValue: number = 60) {
  const [countdown, setCountdown] = useState<number>(0);

  const startCountdown = useCallback(() => setCountdown(initialValue), [initialValue]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer); // Cleanup on unmount
    }
  }, [countdown]);

  return { countdown, startCountdown };
}
