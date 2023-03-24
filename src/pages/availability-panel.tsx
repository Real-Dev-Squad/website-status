import DragDropContextWrapper from '@/components/availability-panel/drag-drop-context/index';
import { AVAILABLE } from '@/components/constants/beautified-task-status';
import { FEATURE } from '@/components/constants/task-type';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import updateTasksStatus from '@/helperFunctions/updateTasksStatus';
import task from '@/interfaces/task.type';
import { useGetIdleStatusQuery, useGetAllTasksQuery } from '@/slices/apiSlice';
import classNames from '@/styles/availabilityPanel.module.scss';
import { FC } from 'react';

const AvailabilityPanel: FC = () => {
  const {
    data: idleMembers,
    isLoading: isIdleMembersLoading,
    refetch: reFetchIdleMembers,
  } = useGetIdleStatusQuery('IDLE');
  const idleMembersUserNames = idleMembers?.map((member) => member.username);

  const {
    data: allTasks = [],
    isLoading: isAllTasksLoading,
    refetch: refetchAllTasks,
  } = useGetAllTasksQuery(null);
  const unAssignedTasks = updateTasksStatus(allTasks).filter(
    (item: task) => item.status === AVAILABLE && item.type === FEATURE
  );

  const handleRefreshData = async () => {
    await reFetchIdleMembers();
    await refetchAllTasks();
  };

  return (
    <Layout>
      <Head title='Availability Panel' />
      <div>
        <div className={classNames.heading}>Availability Panel</div>

        {isIdleMembersLoading || isAllTasksLoading ? (
          <span className={classNames.statusMessage}>Loading...</span>
        ) : unAssignedTasks && idleMembersUserNames ? (
          <DragDropContextWrapper
            idleMembers={idleMembersUserNames}
            unAssignedTasks={unAssignedTasks}
            refreshData={handleRefreshData}
          />
        ) : (
          <span className={classNames.statusMessage}>
            Something went wrong, please contact admin!
          </span>
        )}
      </div>
    </Layout>
  );
};

export default AvailabilityPanel;
