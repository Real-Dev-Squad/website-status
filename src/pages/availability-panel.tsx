import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import task from '@/interfaces/task.type';
import classNames from '@/styles/availabilityPanel.module.scss';
import fetch from '@/helperFunctions/fetch';
import DragDropcontext from '../components/availability-panel/drag-drop-context/index';

const AvailabilityPanel: FC = () => {
  const [idleMembersList, setIdleMembersList] = useState<string[]>([]);
  const [unAssignedTasks, setUnAssignedTasks] = useState<task[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [reRenderComponent, setReRenderComponent] = useState<boolean>(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        setIsLoading(true);
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks`;
        const response = await fetch({ url });
        if (response.status === 200) {
          const { tasks } = response.data;
          const unassigned = tasks.filter(
            (item: task) => item.status.toLowerCase() === 'unassigned' && item.type === 'feature',
          );
          setUnAssignedTasks(unassigned);
        }
      } catch (Error) {
        setError(true);
        setIsLoading(false);
      }
    };
    const fetchIdleUsers = async () => {
      try {
        setIsLoading(true);
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/members/idle`;
        const response = await fetch({ url });
        if (response.status === 200) {
          const { idleMemberUserNames } = response.data;
          const filterMembers = idleMemberUserNames.filter((username:string) => username);
          const sortedIdleMembers = filterMembers.sort();
          setIdleMembersList(sortedIdleMembers);
        }
        setIsLoading(false);
      } catch (Error) {
        setError(true);
        setIsLoading(false);
      }
    };
    fetchTasks();
    fetchIdleUsers();
  }, [reRenderComponent]);

  let isErrorOrIsLoading;
  if (error) {
    isErrorOrIsLoading = (
      <span className={classNames.statusMessage}>
        Something went wrong, please contact admin!
      </span>
    );
  } else if (isLoading) {
    isErrorOrIsLoading = (
      <span className={classNames.statusMessage}>Loading...</span>
    );
  }
  const reRender = () => {
    setReRenderComponent(!reRenderComponent);
  };

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
              reRenderComponent={reRender}
            />
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AvailabilityPanel;
