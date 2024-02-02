import { FC, useState, useEffect } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import task from '@/interfaces/task.type';
import styles from '@/styles/availabilityPanel.module.scss';
import fetch from '@/helperFunctions/fetch';
import DragDropContextWrapper from '@/components/availability-panel/drag-drop-context/index';
import updateTasksStatus from '@/helperFunctions/updateTasksStatus';
import { AVAILABLE } from '@/constants/task-status';
import { FEATURE } from '@/constants/task-type';
import { BASE_URL } from '@/constants/url';
import { useGetIdleUsersQuery } from '@/app/services/idleUsersApi';

const AvailabilityPanel: FC = () => {
    const [unAssignedTasks, setUnAssignedTasks] = useState<task[]>([]);
    const [error, setError] = useState<boolean>(false);
    const [isTaskLoading, setIsTaskLoading] = useState<boolean>(true);
    const [refreshData, setRefreshData] = useState<boolean>(false);
    const {
        data: idleMembersList = [],
        isError: isIdleMembersError,
        isLoading: isIdleMemberLoading,
        refetch: refreshMemberList,
    } = useGetIdleUsersQuery();

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
    if (error || isIdleMembersError) {
        isErrorOrIsLoading = (
            <span className={styles.statusMessage}>
                Something went wrong, please contact admin!
            </span>
        );
    } else if (isTaskLoading || isIdleMemberLoading) {
        isErrorOrIsLoading = (
            <span className={styles.statusMessage}>Loading...</span>
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
                <div className={styles.heading}>Availability Panel</div>
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
