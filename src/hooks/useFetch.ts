import { useState, useEffect } from 'react';

export const useFetch = <T>(fetchFunction: () => Promise<T>, dependencies: T[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  // Memoize the fetch function to avoid unnecessary re-fetching
  const refetch = async () => {
    setLoading(true);
    try {
      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    refetch();
  }, [...dependencies]);

  return { data, loading, error, refetch };
};