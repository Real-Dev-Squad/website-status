import { useRouter } from 'next/router';
import TaskDetails from '@/components/taskDetails';
import { TASKS_URL } from '@/constants/url';
import PageNotFound from '@/pages/404';
const TaskDetailsPage = () => {
    const router = useRouter();
    const id = router.query?.id as string;
    const TASK_DETAILS_URL = `${TASKS_URL}/${id}/details`;

    if (!id) {
        return <PageNotFound />;
    }

    return <TaskDetails url={TASK_DETAILS_URL} taskID={id} />;
};
export default TaskDetailsPage;
