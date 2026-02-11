import { useState, useEffect, useCallback } from 'react';

// T is the Type of data we expect (e.g., Exercise[] or User)
export function useFetch<T>(
  fetchFn: () => Promise<T>, 
  deps: any[] = [] 
) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const executeFetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetchFn();
      setData(result);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }, [fetchFn, ...deps]);

  useEffect(() => {
    executeFetch();
  }, [executeFetch]);

  return { data, loading, error, refetch: executeFetch };
}
