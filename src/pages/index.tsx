import { FC, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import Card from '@/components/tasks/card';
import useFetch from '@/hooks/useFetch';
import classNames from '@/styles/tasks.module.scss';
import { task } from '@/components/constants/types';

const TASKS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks`;

const renderCardList = (tasks: task[]) => tasks.map(
  (item: task) => <Card content={item} key={item.id} />,
);

const Index: FC = () => {
  const [tasks, setTasks] = useState<task[]>([]);
  const [activeTasks, setActiveTasks] = useState<any>(null);
  const [completeTasks, setCompleteTasks] = useState<any>(null);

  const {
    response,
    error,
    isLoading,
  } = useFetch(TASKS_URL);

  useEffect(() => {
    if ('tasks' in response) {
      setTasks(response.tasks);
      const active = tasks.filter(
        (item: task) => item.status === 'Active',
      );
      setActiveTasks(active);

      const complete = tasks.filter(
        (item: task) => item.status !== 'Active',
      );
      setCompleteTasks(complete);
    }
  }, [isLoading, response]);

  return (
    <Layout>
      <Helmet>
        <title>Tasks | Status Real Dev Squad</title>
      </Helmet>

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
              <>
                <div className={classNames.section}>
                  <div className={classNames.heading}>Active</div>
                  <div className={classNames.cardContainer}>
                    {renderCardList(activeTasks)}
                  </div>
                </div>
                <div className={classNames.section}>
                  <div className={classNames.heading}>Completed</div>
                  <div className={classNames.cardContainer}>
                    {renderCardList(completeTasks)}
                  </div>
                </div>
              </>
            )
        }
      </div>
    </Layout>
  );
};

export default Index;
