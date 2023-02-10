import { FC, useState, useEffect, useContext } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import useFetch from '@/hooks/useFetch';
import classNames from '@/styles/tasks.module.scss';
import task from '@/interfaces/task.type';
import fetch from '@/helperFunctions/fetch';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import { useAppContext } from '@/context';
import { isUserAuthorizedContext } from '@/context/isUserAuthorized';
import { TasksProvider } from '@/context/tasks.context';
import TaskList from '@/components/tasks/TaskList/TaskList';
import Tabs from '@/components/Tabs/Tabs';
import Tab from '@/components/Tabs/Tab';
import getTaskMap from '@/helperFunctions/getTaskMap';
import { IN_PROGRESS } from '@/components/constants/task-status';

const { SUCCESS, ERROR } = ToastTypes;
const TASKS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks`;

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
  const [filteredTask, setFilteredTask] = useState<any>(null);
  const { response, error, isLoading } = useFetch(TASKS_URL);
  const { isEditMode } = appState;
  const isUserAuthorized = useContext(isUserAuthorizedContext);
  const isEditable = isUserAuthorized && isEditMode;
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const handleChange = (activeTabIndex: number) => setActiveTabIndex(activeTabIndex);

  useEffect(() => {
    if ('tasks' in response) {
      const taskMap = getTaskMap(response.tasks);
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
      <div className={classNames.headline}>Tasks</div>
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
                    <Tab title={taskKey} key={taskKey}>
                      <TaskList tasks={filteredTask[taskKey]} isEditable={isEditable} updateCardContent={updateCardContent} hasLimit={taskKey == IN_PROGRESS} taskKey={taskKey} />
                    </Tab>
                  ))}
                </Tabs>
              }
            </>
          )}
        </div>
      </TasksProvider>
    </Layout>
  );
};

export default Index;