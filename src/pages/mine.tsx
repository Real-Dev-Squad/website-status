import { FC, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';


import Layout from '@/components/Layout';
import Card from '@/components/tasks/mine_card';
import useFetch from '@/hooks/useFetch';
import classNames from '@/styles/tasks.module.scss';
import { task } from '@/components/constants/types';
// const Mine: FC = () => (
//   <Layout>
//     <Head title="Mine" />
//   </Layout>
// );

// export default Mine;
const TASKS_URL = `https://run.mocky.io/v3/f8799d5e-03b4-4a96-b684-65557b97ecd9`;

const CardList = (tasks: task[]) => tasks.map(
  (item: task) => <Card content={item} key={item.id} />,



const Mine: FC = () => {
  const [tasks, setTasks] = useState<task[]>([]);
  

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
              <div className={classNames.container}>
               {CardList(tasks)} 

              </div>
            )
        }
      </div>
    </Layout>
  );
};

export default Mine;

