import { useState, useEffect } from 'react';
import fetch from '@/helperFunctions/fetch';

const useFetch = (url: string, options: object = {}) => {
  const [response, setResponse] = useState<any>({});
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch({
          url,
          method: 'get',
          ...options,
        });
        setResponse(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url]);
  return { response, error, isLoading };
};

export default useFetch;
