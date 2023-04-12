import { USER_SELF } from '@/components/constants/url';
import fetch from '@/helperFunctions/fetch';

const userData = async () => {
  try {
    const { requestPromise } = fetch({
      url: USER_SELF,
    });
    const response = await requestPromise;
    return response.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export default userData;
