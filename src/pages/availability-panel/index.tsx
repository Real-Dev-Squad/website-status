import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import task from '@/interfaces/task.type';
import classNames from '@/styles/availabilityPanel.module.scss';
import fetch from '@/helperFunctions/fetch';
import DragDropContextWrapper from '@/components/availability-panel/drag-drop-context/index';
import updateTasksStatus from '@/helperFunctions/updateTasksStatus';
import { AVAILABLE } from '@/constants/task-status';
import { FEATURE } from '@/constants/task-type';
import { BASE_URL } from '@/constants/url';
import { useGetIdleMembersQuery } from '@/app/services/membersApi';

const AvailabilityPanel: FC = () => {
    const [unAssignedTasks, setUnAssignedTasks] = useState<task[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [isTaskLoading, setIsTaskLoading] = useState<boolean>(true);
    const [refreshData, setRefreshData] = useState<boolean>(false);
    const {
        data: idleMembersList = [],
        isError: membersError,
        isLoading: isMemberLoading,
        refetch: refreshMemberList,
    } = useGetIdleMembersQuery();

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const url = `${BASE_URL}/tasks`;
                const { requestPromise } = fetch({ url });
                const fetchPromise = await requestPromise;
                const { tasks } = fetchPromise.data;
                const unassigned = updateTasksStatus(tasks).filter(
                    (item: task) =>
                        item.status === AVAILABLE && item.type === FEATURE
                );
                setUnAssignedTasks(unassigned);
            } catch (Error) {
                setError(true);
            } finally {
                setIsTaskLoading(false);
            }
        };
        fetchTasks();
    }, [refreshData]);

    let isErrorOrIsLoading;
    if (error || membersError) {
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
        refreshMemberList();
        setRefreshData(!refreshData);
    };

    return (
        <Layout>
            <Head title="Availability Panel" />
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
