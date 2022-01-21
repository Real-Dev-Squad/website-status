import { useState, useEffect } from 'react';
import fetch from '@/helperFunctions/fetch';

const useFetch = (url: string, options: object = {}) => {
  const [response, setResponse] = useState<any>({});
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    let cancel: () => void;
    (async () => {
      setIsLoading(true);
      try {
        const { requestPromise, cancelApi } = fetch({
          url,
          method: 'get',
          ...options,
        });
        cancel = cancelApi;
        const fetchPromise = await requestPromise;
        setResponse(fetchPromise.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();

    return () => {
      cancel();
      setError(null);
      setResponse({});
      setIsLoading(true);
    };
  }, [url]);
  return {
    response, error, isLoading,
  };
};

export default useFetch;
