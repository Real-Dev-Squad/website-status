import { useState, useEffect } from 'react';
import fetch from '@/helperFunctions/fetch';

const useFetch = (url: string) => {
  const [response, setResponse] = useState<any>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch({
          url,
          method: 'get',
        });
        setResponse(res.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        setError(err);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [url]);
  return { response, error, isLoading };
};

export default useFetch;
