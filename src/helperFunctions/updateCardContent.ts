import task from '@/interfaces/task.type';
import { useUpdateCardContentMutation } from '../app/services/tasksApi';
import { ToastTypes, toast } from './toast';

const { SUCCESS, ERROR } = ToastTypes;

async function updateCardContent(id: string, cardDetails: task) {
    const [updateCardContent] = useUpdateCardContentMutation();

    try {
        await updateCardContent({ id, cardDetails });
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
