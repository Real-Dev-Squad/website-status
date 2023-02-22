import React, { useEffect, useState } from 'react'
import Head from '@/components/head';
import Layout from '@/components/Layout';
import Tabs from '@/components/Tabs/Tabs';
import { TasksProvider } from '@/context/tasks.context';
import updateTasksStatus from '@/helperFunctions/updateTasksStatus';
import useFetch from '@/hooks/useFetch';
import task from '@/interfaces/task.type';
import { TASKS_URL } from '@/components/constants/url';

const Test = () => {
  const [activeTab, setActiveTab] = useState('ASSIGNED')
  const { response, error, isLoading } = useFetch(TASKS_URL);
  const tabs = ['ASSIGNED', 'COMPLETED', 'AVAILABLE','IN_PROGRESS', 'NEEDS_REVIEW', 'IN_REVIEW', 'VERIFIED',  'MERGED']
  useEffect(() => {
    if ('tasks' in response) {
      const tasks = updateTasksStatus(response.tasks);
      
      tasks.sort((a: task, b: task) => +a.endsOn - +b.endsOn);

      const taskMap: any = [];
      tasks.forEach((item) => {
        if (item.status in taskMap) {
          taskMap[item.status] = [...taskMap[item.status], item];
        } else {
          taskMap[item.status] = [item];
        }
      });
    }

    return (() => {
    });
  }, [isLoading, response]);

  function onSelect(tab: string) {
    setActiveTab(tab);
  }

  return (
    <Layout>
      <Head title='Tasks' />
      <TasksProvider >
        <div>
          <Tabs tabs={tabs} onSelect={onSelect} activeTab={activeTab} />
        </div>
      </TasksProvider>
    </Layout>
  )
}

export default Test;