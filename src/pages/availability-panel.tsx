import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import task from '@/interfaces/task.type';
import classNames from '@/styles/availabilityPanel.module.scss';
import fetch from '@/helperFunctions/fetch';
import { ToastContainer } from 'react-toastify';
import DragDropcontext from '../components/availability-panel/drag-drop-context/index';
import 'react-toastify/dist/ReactToastify.css';

const AvailabilityPanel: FC = () => {
  const [idleMembersList, setIdleMembersList] = useState<string[]>([]);
  const [unAssignedTasks, setUnAssignedTasks] = useState<task[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refreshData, setRefreshData] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    const fetchTasks = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks`;
        const response = await fetch({ url });
        const { tasks } = response.data;
        const unassigned = tasks.filter(
          (item: task) => item.status.toLowerCase() === 'unassigned' && item.type === 'feature',
        );
        setUnAssignedTasks(unassigned);
      } catch (Error) {
        setError(true);
      }
    };
    const fetchIdleUsers = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/members/idle`;
        const response = await fetch({ url });

        const { idleMemberUserNames } = response.data;
        const filterMembers = idleMemberUserNames.filter((username:string) => username);
        const sortedIdleMembers = filterMembers.sort();
        setIdleMembersList(sortedIdleMembers);
        setError(false);
      } catch (Error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchTasks();
    fetchIdleUsers();
  }, [refreshData]);

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

  const getData = () => {
    setRefreshData(!refreshData);
  };

  return (
    <>
      <ToastContainer />
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
              refreshData={getData}
            />
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default AvailabilityPanel;
