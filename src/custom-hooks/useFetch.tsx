import { useEffect, useState } from "react";

import { TimelineData } from "../mocks/timeLine.data.mock";

interface Defaults {
  loading: boolean;
  error: any;
  data: any;
}

let defaults: Defaults = {
  loading: false,
  error: undefined,
  data: undefined
};

const useFetch = (url: string) => {
  let [loading, setLoading] = useState(defaults.loading);
  let [error, setError] = useState(defaults.error);
  let [data, setData] = useState(defaults.data);

  const setToLoading = (): void => {
    setLoading(true);
    setData(undefined);
    setError(undefined);
  };

  const setToData = (data: any) => {
    setLoading(false);
    setData(data);
    setError(undefined);
  };

  const setToError = (errorMessage: any) => {
    setLoading(false);
    setData(undefined);
    setError(errorMessage);
  };

  useEffect(() => {
    const fetchUrl = async () => {
      try {
        setToLoading();
        let response = await fetch(url);
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }
        let data = await response.json();
        // mocking the data instead of using real response
        setToData(TimelineData);
      } catch (e) {
        console.log(e);
        setToError(e);
      }
    };
    fetchUrl();
  }, []);

  return { loading, error, data };
};

export default useFetch;
