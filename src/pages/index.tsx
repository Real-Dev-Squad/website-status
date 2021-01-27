import { FC, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Layout from '@/components/Layout';
import Card from '@/components/tasks/card';
import fetch from '@/helperFunctions/fetch';
import classNames from '@/styles/tasks.module.scss';
import { task } from '@/components/constants/types';

const TASKS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks`;

const Index: FC = () => {
  const [tasks, setTasks] = useState<task[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await fetch({
        url: TASKS_URL,
      });
      setTasks(response.data.tasks);
      setLoading(false);
    })();
  }, []);

  const completedTasks = tasks.filter(
    (item: task) => item.status === 'Active',
  );
  const incompleteTasks = tasks.filter(
    (item: task) => item.status !== 'Active',
  );

  const activeCards = completedTasks.map(
    (item: task) => <Card content={item} key={item.id} />,
  );

  const incompletedCards = incompleteTasks.map(
    (item: task) => <Card content={item} key={item.id} />,
  );

  return (
    <Layout>
      <Helmet>
        <title>Tasks | Status Real Dev Squad</title>
      </Helmet>

      <div className="container">
        {
          (loading)
            ? (
              <p>Loading...</p>
            )
            : (
              <>
                <div className={classNames.section}>
                  <div className={classNames.heading}>Active</div>
                  <div className={classNames.cardContainer}>{activeCards}</div>
                </div>
                <div className={classNames.section}>
                  <div className={classNames.heading}>Completed</div>
                  <div className={classNames.cardContainer}>{incompletedCards}</div>
                </div>
              </>
            )
        }
      </div>
    </Layout>
  );
};

export default Index;
