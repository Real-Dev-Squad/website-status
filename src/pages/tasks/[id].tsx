import { FC } from 'react';
import { NextRouter, useRouter } from 'next/router';
import TaskDetails from '@/components/taskDetails';
import { TASK_URL } from '@/components/constants/url';

const TaskDetailsPage: FC = () => {
  const router: NextRouter = useRouter();
  const id: any = router.query.id;
  const TASK_DETAILS_URL: string = `${TASK_URL}/${id}/details`;

  if (!id) {
    return null;
  }

  return <TaskDetails url={TASK_DETAILS_URL} taskID={id} />;
};
export default TaskDetailsPage;
