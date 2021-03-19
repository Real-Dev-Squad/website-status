import { FC,useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Card from '@/components/tasks/mine_card';
import useFetch from '@/hooks/useFetch';
import classNames from '@/styles/tasks.module.scss';
import { task } from '@/components/constants/types';

const TASKS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/self`;


const CardList = (tasks: task[]) => tasks.map(
    (item: task) => <Card content={item} key={item.id} />);

const Mine: FC = () => {
  let [tasks, setTasks] = useState<task[]>([]);
  const {
    response,
    error,
    isLoading,
  } = useFetch(TASKS_URL);

  useEffect(() => {
    if ('tasks' in response) {
      setTasks(response.tasks);

    }
  }, [isLoading, response]);
  return(
  <Layout>
    <Head title="Mine" />
    <div className={classNames.container}>
        {!!error && <p>Something went wrong, please contact admin!</p>}
        {
          isLoading
            ? (
              <p>Loading...</p>
            ) : (

              <>
                {
                  Object.keys(tasks).length > 0
                    ?  (
                      <div>
                        {CardList(tasks)}
                      </div>
                    ) : 'No Tasks Found'
                }
              </>
            )
        }
      </div>
  </Layout>
  );
};

export default Mine;

