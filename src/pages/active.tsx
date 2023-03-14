import { FC, useState, useEffect } from "react";
import Head from "@/components/head";
import Layout from "@/components/Layout";
import Card from "@/components/tasks/card";
import useFetch from "@/hooks/useFetch";
import classNames from "@/styles/tasks.module.scss";
import task from "@/interfaces/task.type";
import {
  BLOCKED, IN_PROGRESS, SMOKE_TESTING,
} from '@/components/constants/task-status';
import updateTasksStatus from '@/helperFunctions/updateTasksStatus';
import beautifyTaskStatus from '@/helperFunctions/beautifyTaskStatus';
import { TASKS_URL } from '@/components/constants/url';


const renderCardList = (tasks: task[]) => {
  const beautifiedTasks = beautifyTaskStatus(tasks);
  return beautifiedTasks.map((item: task) => (
    <Card
      content={item}
      key={item.id}
      shouldEdit={false}
      onContentChange={undefined}
    />
  ));
};

const Active: FC = () => {
  const [tasks, setTasks] = useState<task[]>([]);
  const [activeTasks, setActiveTasks] = useState<any>(null);
  const statusActiveList = [BLOCKED, IN_PROGRESS, SMOKE_TESTING];
  const { response, error, isLoading } = useFetch(TASKS_URL);

  useEffect(() => {
    if ("tasks" in response) {
      setTasks(updateTasksStatus(response.tasks));
      const active = tasks.filter((item: task) =>
        statusActiveList.includes(item.status)
      );
      setActiveTasks(active);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, response]);

  return (
    <Layout>
      <Head title="Tasks" />

      <div className="container">
        {!!error && <p>Something went wrong, please contact admin!</p>}
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <div className={classNames.container}>
            <div className={classNames.title}>Active</div>
            <>
              {activeTasks.length === 0 ? (
                <p>No active tasks found</p>
              ) : (
                renderCardList(activeTasks)
              )}
            </>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Active;
