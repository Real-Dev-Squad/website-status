import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Card from '@/components/tasks/card';
import useFetch from '@/hooks/useFetch';
import classNames from '@/styles/tasks.module.scss';
import task from '@/interfaces/task.type';
import {
  ACTIVE, BLOCKED, IN_PROGRESS, NEW_BLOCKED, SMOKE_TESING, PENDING,
} from '@/components/constants/task-status';

const TASKS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks`;

const renderCardList = (tasks: task[]) => tasks.map(
  (item: task) => (
    <Card
      content={item}
      key={item.id}
      shouldEdit={false}
      onContentChange={undefined}
    />
  ),
);

const Active: FC = () => {
  const [tasks, setTasks] = useState<task[]>([]);
  const [activeTasks, setActiveTasks] = useState<any>(null);
  const statusActiveList = [
    ACTIVE,
    BLOCKED,
    PENDING,
    IN_PROGRESS,
    NEW_BLOCKED,
    SMOKE_TESING,
  ];
  const {
    response,
    error,
    isLoading,
  } = useFetch(TASKS_URL);

  useEffect(() => {
    if ('tasks' in response) {
      setTasks(response.tasks);
      const active = tasks.filter(
        (item: task) => (statusActiveList.includes(item.status)),
      );
      setActiveTasks(active);
    }
  }, [isLoading, response]);

  return (
    <Layout>
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
                  <div className={classNames.title}>Active</div>
                  <>

                    {
                      activeTasks.length === 0
                        ? <p>No active tasks found</p>
                        : renderCardList(activeTasks)
                    }

                  </>
                </div>
              )
        }
      </div>
    </Layout>
  );
};

export default Active;
