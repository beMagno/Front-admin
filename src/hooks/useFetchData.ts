import React, { useEffect, useState } from 'react';
import axios, { AxiosError } from 'axios';

interface FetchDataResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  refetchData: () => void;
}

function useFetchData<T>(url: string): FetchDataResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get<T>(url);
      setData(response.data);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error);
      } else {
        setError(new Error('An unknown error occurred'));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [url]);

  return {
    data,
    loading,
    error,
    refetchData: fetchData,
  };
}
export default useFetchData