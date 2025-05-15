import { useState, useEffect } from 'react';
import { handleError } from '../lib/errorHandler';

interface FetchState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

export function useFetch<T>(url: string, options?: RequestInit) {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    isLoading: true,
    error: null,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setState({ data, isLoading: false, error: null });
      } catch (error) {
        const { message } = handleError(error);
        setState({ data: null, isLoading: false, error: new Error(message) });
      }
    };

    fetchData();
  }, [url, options ? JSON.stringify(options) : null]);

  return state;
}