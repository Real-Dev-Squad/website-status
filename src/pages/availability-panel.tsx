import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import task from '@/interfaces/task.type';
import classNames from '@/styles/availabilityPanel.module.scss';
import fetch from '@/helperFunctions/fetch';
import DragDropContextWrapper from '@/components/availability-panel/drag-drop-context/index';
import updateTasksStatus from '@/helperFunctions/updateTasksStatus';
import { AVAILABLE } from '@/components/constants/task-status';
import { FEATURE } from '@/components/constants/task-type';
import { useRouter } from 'next/router';
import { setCookie, checkThemeHistory, getDefaultOrTransferDark } from '@/helperFunctions/themeHistoryCheck';


const AvailabilityPanel: FC = () => {
  const [idleMembersList, setIdleMembersList] = useState<string[]>([]);
  const [unAssignedTasks, setUnAssignedTasks] = useState<task[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [isTaskLoading, setIsTaskLoading] = useState<boolean>(true);
  const [isMemberLoading, setIsMemberLoading] = useState<boolean>(true);
  const [refreshData, setRefreshData] = useState<boolean>(false);
  const router = useRouter();
  const { query } = router;
  const [mainDarkMode, setMainDarkMode] = useState(getDefaultOrTransferDark(query))

  const themeSetter = () => {
    document.cookie = setCookie(!mainDarkMode);
    setMainDarkMode(!mainDarkMode);
  }

  useEffect(() => {
    setMainDarkMode(checkThemeHistory(document.cookie, query) === "dark");
  }, []);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/tasks`;
        const { requestPromise } = fetch({ url });
        const fetchPromise = await requestPromise;
        const { tasks } = fetchPromise.data;
        const unassigned = updateTasksStatus(tasks).filter(
          (item: task) => item.status === AVAILABLE && item.type === FEATURE
        );
        setUnAssignedTasks(unassigned);
      } catch (Error) {
        setError(true);
      } finally {
        setIsTaskLoading(false);
      }
    };
    const fetchIdleUsers = async () => {
      try {
        const url = `${process.env.NEXT_PUBLIC_BASE_URL}/members/idle`;
        const { requestPromise } = fetch({ url });
        const fetchPromise = await requestPromise;
        const { idleMemberUserNames } = fetchPromise.data;
        const filterMembers = idleMemberUserNames.filter((username: string) => username);
        const sortedIdleMembers = filterMembers.sort();
        setIdleMembersList(sortedIdleMembers);
        setError(false);
      } catch (Error) {
        setError(true);
      } finally {
        setIsMemberLoading(false);
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
  } else if (isTaskLoading || isMemberLoading) {
    isErrorOrIsLoading = (
      <span className={classNames.statusMessage}>Loading...</span>
    );
  }

  const getData = () => {
    setRefreshData(!refreshData);
  };

  return (
    <Layout changeTheme={themeSetter} darkMode={mainDarkMode}>
      <Head title='Availability Panel' />
      <div>
        <div className={classNames.heading}>Availability Panel</div>
        {isErrorOrIsLoading}
        {!isErrorOrIsLoading && (
          <DragDropContextWrapper 
            idleMembers={idleMembersList}
            unAssignedTasks={unAssignedTasks}
            refreshData={getData}
          />
        )}
      </div>
    </Layout>
  );
};

export default AvailabilityPanel;
