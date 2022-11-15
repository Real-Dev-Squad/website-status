import { useState, useEffect } from 'react';
import fetch from '@/helperFunctions/fetch';

type EmptyFunction = () => void;

const useFetch = (url: string, options: object = {}, isCall = true) => {
  const [response, setResponse] = useState<any>({});
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const callAPI = async ():Promise<any | EmptyFunction> => {
    let cancel: () => void;
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
      return cancel;
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }
  useEffect(() => {
    let cancel: any;
    if(isCall) {
      cancel = callAPI();
    }

    return () => {
      if(typeof(cancel) == 'function'){
        cancel();
      }
      setError(null);
      setResponse({});
      setIsLoading(true);
    };
  }, [url, isCall]);
  return {
    response, error, isLoading, callAPI
  };
};

export default useFetch;
