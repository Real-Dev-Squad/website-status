import axios from 'axios';

type fetchParams = {
  url: string;
  method?: 'get' | 'patch' | 'post' | 'delete';
  params?: null;
  data?: null | any;
  headers?: null | object;
  options?: object | null;
};

/**
 * Used for network calls
 * @param url {String} - API Endpoint URL
 * @param method {String} - API Call Method (GET, POST etc.)
 * @param params {Object} - Query Params for the API call
 * @param data {Object} - Body to be sent
 * @param headers {Object} - Headers to be sent
 * @param options {Object} - Options to be sent via axios
 */

const fetch = ({
  url,
  method = 'get',
  params = null,
  data = null,
  headers = null,
  options = {},
}: fetchParams):{ requestPromise: Promise<any>, cancelApi: () => void } => {
  const { CancelToken } = axios;
  const source = CancelToken.source();
  const requestPromise = axios({
    method,
    url,
    params,
    data,
    headers: {
      'Content-type': 'application/json',
      ...headers,
    },
    withCredentials: true,
    cancelToken: source.token,
    ...options,
  });
  return {
    requestPromise,
    cancelApi: source.cancel,
  };
};

export default fetch;
