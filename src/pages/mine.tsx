import { FC, useState, useEffect, useContext } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Card from '@/components/tasks/card';
import useFetch from '@/hooks/useFetch';
import classNames from '@/styles/tasks.module.scss';
import task from '@/interfaces/task.type';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import { useAppContext } from '@/context';
import { isUserAuthorizedContext } from '@/context/isUserAuthorized';
import fetch from '@/helperFunctions/fetch';

const TASKS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks/self`;
const { SUCCESS, ERROR } = ToastTypes;

async function updateCardContent(id: string, cardDetails: task) {
  try {
    const { requestPromise } = fetch({
      url: `${TASKS_URL}/${id}`,
      method: 'patch',
      data: cardDetails,
    });
    await requestPromise;
    toast(SUCCESS, 'Changes have been saved !');
  } catch (err: any) {
    if ('response' in err) {
      toast(ERROR, err.response.data.message);
      return;
    }
    toast(ERROR, err.message);
  }
}

function CardList(tasks: task[], isEditable: boolean) {
  return tasks.map(
    (item: task) => (
      <Card
        content={item}
        key={item.id}
        shouldEdit={isEditable}
        onContentChange={async (id: string, newDetails: any) => isEditable
          && updateCardContent(id, newDetails)}
      />
    ),
  );
}

const Mine: FC = () => {
  const { state: appState } = useAppContext();  
  const [tasks, setTasks] = useState<task[]>([]);
  const { isEditMode } = appState;
  const isUserAuthorized = useContext(isUserAuthorizedContext);
  const isEditable = isEditMode;
  const {
    response,
    error,
    isLoading,
  } = useFetch(TASKS_URL);
  useEffect(() => { setTasks(response); }, [isLoading, response]);

  return (
    <Layout>
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
                        {CardList(tasks, isEditable)}
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
