import { useRouter } from 'next/router';
import TaskDetails from '@/components/taskDetails';
import { TASKS_URL } from '@/constants/url';
import PageNotFound from '@/pages/404';
import LinkPreviewCard from '@/components/PreviewCard/LinkPreviewCard';
import { useGetTaskDetailsQuery } from '@/app/services/taskDetailsApi';

const TaskDetailsPage = () => {
    const router = useRouter();
    const id = router.query?.id as string;
    const TASK_DETAILS_URL = `${TASKS_URL}/${id}/details`;

    if (!id) {
        return <PageNotFound />;
    }

    const { data } = useGetTaskDetailsQuery(id);
    const taskDetails: any = data?.taskData;
    const taskURL: any = `https://status.realdevsquad.com/tasks/${id}`;

    return (
        <>
            <LinkPreviewCard taskDetails={taskDetails} taskURL={taskURL} />
            <TaskDetails url={TASK_DETAILS_URL} taskID={id} />;
        </>
    );
};

export default TaskDetailsPage;
