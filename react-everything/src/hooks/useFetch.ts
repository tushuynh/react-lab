import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse, CancelTokenSource } from 'axios';

interface FetchResult<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

function useFetch<T>(url: string): FetchResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const cancelTokenSource: CancelTokenSource = axios.CancelToken.source();

    const fetchData = async () => {
      try {
        const response: AxiosResponse<T> = await axios.get(url, {
          cancelToken: cancelTokenSource.token,
        });
        setData(response.data);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('Request canceled:', err.message);
        } else if (axios.isAxiosError(err)) {
          setError(err);
        } else {
          setError(new AxiosError('An unknown error occurred'));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      cancelTokenSource.cancel('Component unmounted or URL changed');
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
