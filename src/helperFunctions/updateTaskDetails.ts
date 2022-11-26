import fetch from '@/helperFunctions/fetch';
import { TASK_URL } from '@/components/constants/url';

const updateTaskDetails = async (editedDetails = {}, taskID = '') => {
  const response = fetch({
    url: `${TASK_URL}/${taskID}`,
    method: 'patch',
    data: JSON.stringify(editedDetails),
  });
  const responseData = await response.requestPromise;
  return responseData;
};

export default updateTaskDetails;
