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
const SELF_URL = 'https://api.realdevsquad.com/users/self';
const STATUS_ORDER = [ACTIVE, ASSIGNED, COMPLETED, PENDING, UNASSIGNED];

async function updateCardContent(cardDetails: task) {
  try {
    const { requestPromise } = fetch({
      url: `${TASKS_URL}/${cardDetails.id}`,
      method: 'patch',
      data: cardDetails,
    });
    await requestPromise;
    toast(SUCCESS, 'Changes have been saved !');
  } catch (err:any) {
    if ('response' in err) {
      toast(ERROR, err.response.data.message);
      return;
    }
    toast(ERROR, err.message);
  }
}

function renderCardList(tasks: task[], isEditable: boolean) {
  return tasks.map((item: task) => (
    <Card
      content={item}
      key={item.id}
      shouldEdit={isEditable}
      onContentChange={async (newDetails: any) => updateCardContent(newDetails)}
    />
  ));
}

const Index: FC = () => {
  const router = useRouter();
  const { query } = router;
  let tasks: task[] = [];
  const [filteredTask, setFilteredTask] = useState<any>([]);
  const { response, error, isLoading } = useFetch(TASKS_URL);
  const [isUserAuthorized, setisUserAuthorized] = useState(false);
  const isEditable = !!query.edit && isUserAuthorized;
  useEffect(() => {
    if ('tasks' in response) {
      tasks = response.tasks;
      tasks.sort((a: task, b: task) => +a.endsOn - +b.endsOn);
      tasks.sort((a:task, b:task) => STATUS_ORDER.indexOf(a.status)
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
  }, [isLoading, response]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseForEdit = fetch({ url: SELF_URL });
        const fetchPromise = await responseForEdit.requestPromise;
        const userRoles = {
          adminUser: fetchPromise?.data?.user?.roles?.admin,
          superUser: fetchPromise?.data?.user?.roles?.super_user,
        };
        const { adminUser, superUser } = userRoles;
        setisUserAuthorized(adminUser || superUser);
      } catch (err: any) {
        toast(ERROR, err.message);
      }
    };
    fetchData();
  }, []);
  return (
    <Layout>
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
                  {renderCardList(filteredTask[key], isEditable)}
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
