import React from 'react';
import { useRouter } from 'next/router';
import {
    DependencyItem,
    DependencyListProps,
} from '@/interfaces/taskDetails.type';
import { useGetTasksDependencyDetailsQuery } from '@/app/services/taskDetailsApi';
import DependencyListItem from './DependencyListItem';

import styles from '../task-details.module.scss';

const DependencyList: React.FC<DependencyListProps> = ({
    taskDependencyIds,
}) => {
    const router = useRouter();
    const navigateToTask = (taskId: string) => {
        router.push(`/tasks/${taskId}`);
    };

    const {
        data: dependencyData,
        isLoading,
        isFetching,
        isError,
    } = useGetTasksDependencyDetailsQuery(taskDependencyIds);

    if (isLoading || isFetching) {
        return <p>Loading...</p>;
    }

    if (isError) {
        return <p>Unable to fetch dependency tasks</p>;
    }

    if (dependencyData && dependencyData.length) {
        return (
            <ol
                className={styles['task_dependency_list_container']}
                data-testid="dependency-list"
            >
                {dependencyData.map((task: DependencyItem, index: number) => (
                    <li key={index}>
                        <DependencyListItem
                            task={task}
                            navigateToTask={navigateToTask}
                        />
                    </li>
                ))}
            </ol>
        );
    }

    return <p>No Dependencies</p>;
};

export default DependencyList;
