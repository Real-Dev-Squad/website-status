import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Card from '@/components/tasks/card';
import useFetch from '@/hooks/useFetch';
import classNames from '@/styles/tasks.module.scss';
import { task } from '@/components/constants/types';
import Accordion from '@/components/Accordion';

const TASKS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks`;

function renderCardList(tasks: task[]) {
  return tasks.map((item: task) => <Card content={item} key={item.id} />);
}

const Index: FC = () => {
  let tasks: task[] = [];
  const [filteredTask, setFilteredTask] = useState<any>([]);

  const { response, error, isLoading } = useFetch(TASKS_URL);

  useEffect(() => {
    if ('tasks' in response) {
      tasks = response.tasks;
      const taskMap: any = [];
      tasks.forEach((item) => {
        if (item.status in taskMap) {
          taskMap[item.status] = [...taskMap[item.status], item];
        } else {
          taskMap[item.status] = [item];
        }
      });
      setFilteredTask(taskMap);
    }
  }, [isLoading, response]);

  return (
    <Layout>
      <Head title="Tasks" />

      <div className={classNames.container}>
        {!!error && <p>Something went wrong, please contact admin!</p>}
        {(!filteredTask.length && !isLoading) && <p>No tasks found</p>}
        {
          isLoading
            ? (
              <p>Loading...</p>
            ) : (
              <>
                {
                  Object.keys(filteredTask).length > 0
                    ? Object.keys(filteredTask).map((key) => (
                      <Accordion title={key}>
                        {renderCardList(filteredTask[key])}
                      </Accordion>
                    )) : 'No Tasks Found'
                }
              </>
            )
        }
      </div>
    </Layout>
  );
};

export default Index;
