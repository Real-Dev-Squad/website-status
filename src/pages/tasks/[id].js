import { useRouter } from 'next/router';
import useFetch from '@/hooks/useFetch';
import { useState } from 'react';
import { useEffect } from 'react';

import TaskDetails from '@/components/tasks/taskDetails/TaskDetails';

const TaskDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const TASK_DETAILS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/${id}/details`;

  const [taskDetails, setTaskDetails] = useState(null);
  const { response, error, isLoading } = useFetch(TASK_DETAILS_URL);

  useEffect(() => {
    setTaskDetails(response.taskData);
  }, [isLoading, response]);
  return (
    <>
      {!!error && <p>Something went wrong!</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TaskDetails
          title={taskDetails?.title}
          purpose={taskDetails?.purpose}
          type={taskDetails?.type}
          priority={taskDetails?.priority}
          status={taskDetails?.status}
          links={taskDetails?.featureUrl}
          participants={taskDetails?.participants}
          assignee={taskDetails?.assignee}
          startedOn={taskDetails?.startedOn}
          endsOn={taskDetails?.endsOn}
        />
      )}
    </>
  );
};
export default TaskDetailsPage;
