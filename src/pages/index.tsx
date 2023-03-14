import { FC, useState, useEffect, useContext } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import useFetch from '@/hooks/useFetch';
import classNames from '@/styles/tasks.module.scss';
import task from '@/interfaces/task.type';
import Accordion from '@/components/Accordion';
import fetch from '@/helperFunctions/fetch';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import {
  ASSIGNED,
  COMPLETED,
  AVAILABLE,
  IN_PROGRESS,
  SMOKE_TESTING,
  NEEDS_REVIEW,
  IN_REVIEW,
  APPROVED,
  MERGED,
  SANITY_CHECK,
  REGRESSION_CHECK,
  RELEASED,
  VERIFIED,
  BLOCKED,
} from '@/components/constants/task-status';
import updateTasksStatus from '@/helperFunctions/updateTasksStatus';
import { useAppContext } from '@/context';
import { isUserAuthorizedContext } from '@/context/isUserAuthorized';
import { TasksProvider } from '@/context/tasks.context';
import TaskList from '@/components/tasks/TaskList/TaskList';
import { TASKS_URL } from '@/components/constants/url';

const { SUCCESS, ERROR } = ToastTypes;
const STATUS_ORDER = [
  ASSIGNED,
  COMPLETED,
  BLOCKED,
  AVAILABLE,
  IN_PROGRESS,
  SMOKE_TESTING,
  NEEDS_REVIEW,
  IN_REVIEW,
  APPROVED,
  MERGED,
  SANITY_CHECK,
  REGRESSION_CHECK,
  RELEASED,
  VERIFIED,
];
const statusActiveList = [
  IN_PROGRESS,
  BLOCKED,
  SMOKE_TESTING,
];
async function updateCardContent(id: string, cardDetails: task) {
  try {
    const { requestPromise } = fetch({
      url: `${TASKS_URL}/${id}`,
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


const Index: FC = () => {
  const { state: appState } = useAppContext();  
  const [filteredTask, setFilteredTask] = useState<any>([]);
  const { response, error, isLoading } = useFetch(TASKS_URL);
  const { isEditMode } = appState;
  const isUserAuthorized = useContext(isUserAuthorizedContext);
  const isEditable = isUserAuthorized && isEditMode;
  useEffect(() => {
    if ('tasks' in response) {
      const tasks = updateTasksStatus(response.tasks);
      tasks.sort((a: task, b: task) => +a.endsOn - +b.endsOn);
      tasks.sort((a: task, b: task) => STATUS_ORDER.indexOf(a.status)
        - STATUS_ORDER.indexOf(b.status));
      const taskMap: any = [];
      tasks.forEach((item) => {
        if (item.status in taskMap) {
          taskMap[item.status] = [...taskMap[item.status], item];
        } else {
          taskMap[item.status] = [item];
        }
      });
      setFilteredTask(taskMap);
    }

    return(() => {
      setFilteredTask([]);
    });
  }, [isLoading, response]);

  return (
    <Layout>
      <Head title='Tasks' />
        <TasksProvider >
          <div className={classNames.container}>
            {!!error && <p>Something went wrong, please contact admin!</p>}
            {isLoading ? (
              <p>Loading...</p>
            ) : (
              <>
                {Object.keys(filteredTask).length > 0
                  ? Object.keys(filteredTask).map((key) => (
                    <Accordion open={(statusActiveList.includes(key))} title={key} key={key}>
                      <TaskList tasks={filteredTask[key]} isEditable={isEditable} updateCardContent={updateCardContent} hasLimit={key == IN_PROGRESS}/>
                    </Accordion>
                  ))
                  : !error && 'No Tasks Found'}
              </>
            )}
          </div>
      </TasksProvider>
    </Layout>
  );
};

export default Index;
