import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import useFetch from '@/hooks/useFetch';
import { task } from '@/components/constants/types';
import classNames from '@/styles/availabilityPanel.module.scss';
import DragDropcontext from '../components/availability-panel/drag-drop-context/index';

const TASKS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks`;
const IDLE_MEMBERS_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/members/idle`;

const AvailabilityPanel: FC = () => {
  const [idleMembersList, setIdleMembersList] = useState<any>([]);
  const [tasks, setTasks] = useState<task[]>([]);
  const [unAssignedTasks, setUnAssignedTasks] = useState<any>(null);

  const {
    response: taskResponse,
    error: taskError,
    isLoading: taskIsLoading,
  } = useFetch(TASKS_URL);

  const { response, error, isLoading } = useFetch(IDLE_MEMBERS_URL);

  useEffect(() => {
    if ('tasks' in taskResponse) {
      setTasks(taskResponse.tasks);
      const active = tasks.filter(
        (item: task) => item.status.toLowerCase() === 'unassigned',
      );
      setUnAssignedTasks(active);
    }

    if ('idleMemberUserNames' in response) {
      const sortedIdleMembers = response.idleMemberUserNames.sort();
      setIdleMembersList(sortedIdleMembers);
    }
  }, [isLoading, response, taskIsLoading, taskResponse]);

  let isErrorOrIsLoading;
  if (!!error || !!taskError) {
    isErrorOrIsLoading = (
      <span className={classNames.statusMessage}>
        Something went wrong, please contact admin!
      </span>
    );
  } else if (isLoading || taskIsLoading) {
    isErrorOrIsLoading = (
      <span className={classNames.statusMessage}>Loading...</span>
    );
  }

  return (
    <Layout>
      <Head title="Availability Panel" />
      <div>
        <div>
          <div className={classNames.heading}>Availability Panel</div>
          {isErrorOrIsLoading}
          {!isErrorOrIsLoading && (
            <DragDropcontext
              idleMembers={idleMembersList}
              unAssignedTasks={unAssignedTasks}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AvailabilityPanel;
