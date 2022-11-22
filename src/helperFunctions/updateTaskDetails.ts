import fetch from '@/helperFunctions/fetch';

const updateTaskDetails = async (editedDetails = {}, taskID = '') => {
  const response = fetch({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${taskID}`,
    method: 'patch',
    data: JSON.stringify(editedDetails),
  });
  const responseData = await response.requestPromise;
  return responseData;
};

export default updateTaskDetails;
