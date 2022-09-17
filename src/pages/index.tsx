import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Card from '@/components/tasks/card';
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
import beautifyTaskStatus from '@/helperFunctions/beautifyTaskStatus';
import updateTasksStatus from '@/helperFunctions/updateTasksStatus';
import { useAppContext } from '@/context';

const { SUCCESS, ERROR } = ToastTypes;
const TASKS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks`;
const SELF_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/users/self`;
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

function renderCardList(tasks: task[], isEditable: boolean) {
  const beautifiedTasks = beautifyTaskStatus(tasks);
  return beautifiedTasks.map((item: task) => (
    <Card
      content={item}
      key={item.id}
      shouldEdit={isEditable}
      onContentChange={async (id: string, newDetails: any) => isEditable
        && updateCardContent(id, newDetails)}
    />
  ));
}

const Index: FC = () => {
  const { state: appState } = useAppContext();  
  const [filteredTask, setFilteredTask] = useState<any>([]);
  const { response, error, isLoading } = useFetch(TASKS_URL);
  const [isUserAuthorized, setIsUserAuthorized] = useState(false);
  const { isEditMode } = appState;
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { requestPromise } = fetch({ url: SELF_URL });
        const { data } = await requestPromise;
        const userRoles = {
          adminUser: data.roles?.admin,
          superUser: data.roles?.super_user,
        };
        const { adminUser, superUser } = userRoles;
        setIsUserAuthorized(!!adminUser || !!superUser);
      } catch (err: any) {
        toast(ERROR, err.message);
      }
    };
    fetchData();

    return (() => {
      setIsUserAuthorized(false);
    });
  }, []);

  return (
    <Layout>
      <Head title='Tasks' />

      <div className={classNames.container}>
        {!!error && <p>Something went wrong, please contact admin!</p>}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {Object.keys(filteredTask).length > 0
              ? Object.keys(filteredTask).map((key) => (
                <Accordion open={(statusActiveList.includes(key))} title={key} key={key}>
                  {renderCardList(filteredTask[key], isEditable)}
                </Accordion>
              ))
              : !error && 'No Tasks Found'}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
