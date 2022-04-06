import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Card from '@/components/tasks/card';
import useFetch from '@/hooks/useFetch';
import classNames from '@/styles/tasks.module.scss';
import task from '@/interfaces/task.type';
import { ThemedComponent } from '@/interfaces/themedComponent.type';

const TASKS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/self`;

function CardList(tasks: task[], setDarkMode: boolean) {
  return tasks.map(
    (item: task) => (
      <Card
        darkMode={setDarkMode}
        content={item}
        key={item.id}
        shouldEdit={false}
        onContentChange={undefined}
      />
    ),
  );
}

const Mine: FC<ThemedComponent> = ({themeSetter, theme}) => {
  const [tasks, setTasks] = useState<task[]>([]);
  const {
    response,
    error,
    isLoading,
  } = useFetch(TASKS_URL);

  useEffect(() => { setTasks(response); }, [isLoading, response]);

  return (
    <Layout changeTheme={themeSetter} darkMode={theme}>
      <Head title="Mine" />
      <div className={classNames.container}>
        {
          !!error
          && (error?.response?.data?.statusCode === 401 ? (
            <div>
              <p>You are not Authorized</p>
              <a
                href="https://github.com/login/oauth/authorize?client_id=c4a84431feaf604e89d1"
                target="_blank"
                rel="noreferrer"
              >
                Click here to Login
              </a>
            </div>
          ) : <div><p>Something went wrong! Please contact admin</p></div>)
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
                        {CardList(tasks, theme)}
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
