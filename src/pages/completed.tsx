import type { FC } from 'react';
import { useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Card from '@/components/tasks/card';
import useFetch from '@/hooks/useFetch';
import classNames from '@/styles/tasks.module.scss';
import task from '@/interfaces/task.type';
import { COMPLETED } from '@/components/constants/task-status';
import updateTasksStatus from '@/helperFunctions/updateTasksStatus';
import { ThemedComponent } from '@/interfaces/themedComponent.type';


const TASKS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks`;

const renderCardList = (tasks: task[], darkModeToggle: boolean) => tasks.map(
  (item: task) => (
    <Card
      content={item}
      key={item.id}
      shouldEdit={false}
      onContentChange={undefined}
      darkMode={darkModeToggle}
    />
  ),
);

const Completed: FC<ThemedComponent> = ({themeSetter, theme}) => {
  const [tasks, setTasks] = useState<task[]>([]);
  const [completeTasks, setCompleteTasks] = useState<any>(null);

  const {
    response,
    error,
    isLoading,
  } = useFetch(TASKS_URL);

  useEffect(() => {
    if ('tasks' in response) {
      setTasks(updateTasksStatus(response.tasks));
      const complete = tasks.filter(
        (item: task) => (item.status === COMPLETED),
      );
      setCompleteTasks(complete);
    }
  }, [isLoading, response]);

  return (
    <Layout changeTheme={themeSetter} darkMode={theme}>
      <Head title="Tasks" />

      <div className="container">
        {
            (!!error) && (
            <p>Something went wrong, please contact admin!</p>
            )
        }
        {
            (isLoading)
              ? (
                <p>Loading...</p>
              )
              : (
                <div className={classNames.container}>
                  <div className={classNames.title}>Completed</div>
                  <>

                    {
                      response.data === undefined
                        ? <p>No completed tasks found</p>
                        : renderCardList(completeTasks, theme)
                    }

                  </>
                </div>
              )
        }
      </div>
    </Layout>
  );
};

export default Completed;
