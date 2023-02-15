import { FC, useState, useEffect, useContext } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import useFetch from '@/hooks/useFetch';
import Tabs from '@/components/Tabs/Tabs';
import { TasksProvider } from '@/context/tasks.context';
import getTaskMap from '@/helperFunctions/getTaskMap';
import classNames from '@/styles/tasks.module.scss';
import { TASKS_URL } from '@/components/constants/url';

const Index: FC = () => {
  const [filteredTasks, setFilteredTasks] = useState<any>(null);
  const { response, error, isLoading } = useFetch(TASKS_URL);

  useEffect(() => {
    if ('tasks' in response) {
      const taskMap = getTaskMap(response.tasks);
      if (Object.keys(taskMap)?.length) { // handles empty object
        setFilteredTasks(taskMap);
      }
    }

    return (() => {
      setFilteredTasks(null);
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
              {filteredTasks && !error &&
                <Tabs filteredTasks={filteredTasks} title='Tasks' />
              }
            </>
          )}
        </div>
      </TasksProvider>
    </Layout>
  );
};

export default Index;