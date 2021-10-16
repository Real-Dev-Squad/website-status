import { USER_SELF } from '@/components/constants/url';
import fetch from '@/helperFunctions/fetch';

const userData = async () => {
  const { requestPromise } = fetch({
    url: USER_SELF,
    method: 'get',
  });
  const response = await requestPromise;
  return response.data;
};

export default userData;
