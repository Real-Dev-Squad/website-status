import { useRouter } from 'next/router';

import TaskDetails from '@/components/tasks/taskDetails/TaskDetails';

const TaskDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const TASK_DETAILS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${id}/details`;

  return (
    <>
      <TaskDetails url={TASK_DETAILS_URL} taskID={id} />
    </>
  );
};
export default TaskDetailsPage;
