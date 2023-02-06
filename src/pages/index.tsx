import { FC, useState, useEffect, useContext } from 'react';
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
import { isUserAuthorizedContext } from '@/context/isUserAuthorized';
import { TasksProvider } from '@/context/tasks.context';
import Tabs from '@/components/Tabs/Tabs';
import Tab from '@/components/Tabs/Tab';

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
] as const;

type StatusOrderType = typeof STATUS_ORDER[number] //union of all status order

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
} //service

function renderCardList(tasks: task[], isEditable: boolean, taskKey: string) {
  if (!tasks || !tasks?.length) {
    return <div>
      No {taskKey} tasks found
    </div>
  }
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
  const [filteredTask, setFilteredTask] = useState<any>(null);
  const { response, error, isLoading } = useFetch(TASKS_URL);
  const { isEditMode } = appState;
  const isUserAuthorized = useContext(isUserAuthorizedContext);
  const isEditable = isUserAuthorized && isEditMode;
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleChange = (activeTabIndex: number) => setActiveTabIndex(activeTabIndex);

  useEffect(() => {
    if ('tasks' in response) {
      const tasks = updateTasksStatus(response.tasks);
      tasks.sort((a: task, b: task) => +a.endsOn - +b.endsOn);
      tasks.sort((a: task, b: task) => STATUS_ORDER.indexOf(a.status as StatusOrderType)
        - STATUS_ORDER.indexOf(b.status as StatusOrderType));
      const taskMap: any = {};
      tasks.forEach((item) => {
        if (item.status in taskMap) {
          taskMap[item.status] = [...taskMap[item.status], item];
        } else {
          taskMap[item.status] = [item];
        } //108 to 118
      });
      if (Object.keys(taskMap)?.length) { // handles empty object
        setFilteredTask(taskMap);
      }
    }

    return (() => {
      setFilteredTask(null);
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
              {filteredTask && !error &&
                <Tabs active={activeTabIndex} onChange={handleChange}>
                  {Object.keys(filteredTask).map((taskKey, index) => (
                    <Tab title={taskKey} key={index}>
                      {renderCardList(filteredTask[taskKey], isEditable, taskKey)}
                    </Tab>
                  ))}
                </Tabs>
              }
            </>
          )}
        </div>
        <div>

        </div>
      </TasksProvider>
    </Layout>
  );
};

export default Index;
/**
 * comooponent to create feature flag that renders children
 */