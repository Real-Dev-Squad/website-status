import { FC, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Card from '@/components/tasks/card';
import useFetch from '@/hooks/useFetch';
import classNames from '@/styles/tasks.module.scss';
import task from '@/interfaces/task.type';
import Accordion from '@/components/Accordion';
import fetch from '@/helperFunctions/fetch';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import {
  ACTIVE,
  ASSIGNED,
  COMPLETED,
  UNASSIGNED,
  PENDING,
} from '@/components/constants/task-status';

const { SUCCESS, ERROR } = ToastTypes;
const TASKS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks`;
const SELF_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/users/self`;
const STATUS_ORDER = [ACTIVE, ASSIGNED, COMPLETED, PENDING, UNASSIGNED];

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

function renderCardList(tasks: task[], isEditable: boolean, darkModeToggle: boolean) {
  return tasks.map((item: task) => (
    <Card
      darkMode={darkModeToggle}
      content={item}
      key={item.id}
      shouldEdit={isEditable}
      onContentChange={async (id: string, newDetails: any) => isEditable
        && updateCardContent(id, newDetails)}
    />
  ));
}

const Index: FC = () => {
  const router = useRouter();
  const { query } = router;
  const [filteredTask, setFilteredTask] = useState<any>([]);
  const { response, error, isLoading } = useFetch(TASKS_URL);
  const [IsUserAuthorized, setIsUserAuthorized] = useState(false);
  const isEditable = !!query.edit && IsUserAuthorized;

  const [mainDarkMode, setMainDarkMode] = useState(false)

  useEffect(() => console.log(mainDarkMode), [mainDarkMode])

  useEffect(() => {
    if ('tasks' in response) {
      let tasks: task[] = response.tasks;
      tasks.sort((a: task, b: task) => +a.endsOn - +b.endsOn);
      tasks.sort((a: task, b: task) => STATUS_ORDER.indexOf(a.status)
        - STATUS_ORDER.indexOf(b.status));
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

    return(() => {
      setFilteredTask([]);
    });
  }, [isLoading, response]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { requestPromise } = fetch({ url: SELF_URL });
        const { data } = await requestPromise;
        const userRoles = {
          adminUser: data.roles?.admin,
          superUser: data.roles?.super_user,
        };
        const { adminUser, superUser } = userRoles;
        setIsUserAuthorized(!!adminUser || !!superUser);
      } catch (err: any) {
        toast(ERROR, err.message);
      }
    };
    fetchData();

    return (() => {
      setIsUserAuthorized(false);
    });
  }, []);

  const themeSetter = () => {
    setMainDarkMode(!mainDarkMode)
  }

  return (
    <Layout changeTheme={themeSetter} darkMode={mainDarkMode}>
      <Head title="Tasks" />

      <div className={classNames.container}>
        {!!error && <p>Something went wrong, please contact admin!</p>}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            {Object.keys(filteredTask).length > 0
              ? Object.keys(filteredTask).map((key) => (
                <Accordion open={(key === ACTIVE)} title={key} key={key}>
                  {renderCardList(filteredTask[key], isEditable, mainDarkMode)}
                </Accordion>
              ))
              : !error && 'No Tasks Found'}
          </>
        )}
      </div>
    </Layout>
  );
};

export default Index;
