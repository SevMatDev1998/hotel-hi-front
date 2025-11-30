import { useCallback,useState } from 'react';

export const useLazyFetch = <T>(fetchFunction: () => Promise<T>, dependencies: T[] = []) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const memoizedFetchFunction = useCallback(fetchFunction, dependencies);

  const handle = useCallback(async () => {
    setLoading(true);
    try {
      const result = await memoizedFetchFunction();
      setData(result);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  }, [memoizedFetchFunction]);



  return [handle, { data, loading, error }];
};