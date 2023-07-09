import task from '@/interfaces/task.type';
import { ToastTypes, toast } from './toast';
import fetch from './fetch';
import { TASKS_URL } from '@/constants/url';

const { SUCCESS, ERROR } = ToastTypes;

async function updateCardContent(
    id: string,
    cardDetails: task,
    isDevEnabled?: boolean
) {
    try {
        const { requestPromise } = fetch({
            url: isDevEnabled
                ? `${TASKS_URL}/${id}?userStatusFlag=true`
                : `${TASKS_URL}/${id}`,
            method: 'patch',
            data: cardDetails,
        });
        await requestPromise;
        toast(SUCCESS, 'Changes have been saved !');
    } catch (err: any) {
        if ('response' in err) {
            toast(ERROR, err.response.data.message);
            return;
        }
        toast(ERROR, err.message);
    }
}
export default updateCardContent;
