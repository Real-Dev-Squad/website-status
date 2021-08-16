import { useState, useEffect } from 'react';
import fetch from '@/helperFunctions/fetch';

const useFetch = (url: string, options: object = {}) => {
  const [response, setResponse] = useState<any>({});
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  let cancel: () => void;
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const { response: res, cancelApi } = fetch({
          url,
          method: 'get',
          ...options,
        });
        cancel = cancelApi;
        const fetchPromise = await res;
        setResponse(fetchPromise.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();
    return () => {
      cancel();
    };
  }, [url]);
  return {
    response, error, isLoading,
  };
};

export default useFetch;
