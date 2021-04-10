import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Card from '@/components/tasks/card';
import useFetch from '@/hooks/useFetch';
import classNames from '@/styles/tasks.module.scss';
import { task } from '@/components/constants/types';

const TASKS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/task/self`;

function CardList(tasks: task[]) {
  return tasks.map(
    (item: task) => <Card content={item} key={item.id} />,
  );
}

const Mine: FC = () => {
  const [tasks, setTasks] = useState<task[]>([]);
  const {
    response,
    error,
    isLoading,
  } = useFetch(TASKS_URL);

  useEffect(() => {
    if ('tasks' in response) { setTasks(response.tasks); }
  }, [isLoading, response]);
  return (
    <Layout>
      <Head title="Mine" />
      <div className={classNames.container}>
        {
          !!error
          && <p>Something went wrong, please contact admin!</p>
        }
        {
          isLoading
            ? (
              <p>Loading...</p>
            ) : (
              <>
                {
                  tasks.length > 0
                    ? (
                      <div>
                        {CardList(tasks)}
                      </div>
                    ) : (!error && 'No Tasks Found')
                }
              </>
            )
        }
      </div>
    </Layout>
  );
};
export default Mine;
