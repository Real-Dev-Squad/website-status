import React from 'react';

const useFetch = (url: string, options: object = {}) => {
  const [response, setResponse] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  React.useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        setResponse(json);
        setIsLoading(false);
      } catch (err) {
        setError(err);
      }
    })();
  }, []);
  return { response, error, isLoading };
};

export default useFetch;
