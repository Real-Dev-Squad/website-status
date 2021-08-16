import axios from 'axios';

type fetchParams = {
  url: string;
  method?: 'get' | 'patch';
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
}: fetchParams):{ response: Promise<any>, cancelApi: () => void } => {
  const { CancelToken } = axios;
  const source = CancelToken.source();
  const response = axios({
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
    response,
    cancelApi: source.cancel,
  };
};

export default fetch;
