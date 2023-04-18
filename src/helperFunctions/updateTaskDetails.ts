import fetch from '@/helperFunctions/fetch';
import { TASKS_URL } from '@/components/constants/url';

const updateTaskDetails = async (editedDetails = {}, taskID = '') => {
    try {
        const response = fetch({
            url: `${TASKS_URL}/${taskID}`,
            method: 'patch',
            data: JSON.stringify(editedDetails),
        });
        const responseData = await response.requestPromise;
        return responseData;
    } catch (e) {
        console.error(e);
    }
};

export default updateTaskDetails;
