import React, { ReactNode } from 'react';
import Link from 'next/link';
import {
    DependencyListProps,
    DependencyItem,
} from '@/interfaces/taskDetails.type';
import classNames from '../task-details.module.scss';
import { useRouter } from 'next/router';
import { useGetTasksDependencyDetailsQuery } from '@/app/services/taskDetailsApi';
import { UNABLE_TO_FETCH_MESSAGE } from '@/constants/messages';

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
    } else if (dependencyData && dependencyData.length) {
        return (
            <ol
                className={classNames['task_dependency_list_container']}
                data-testid="dependency-list"
            >
                {dependencyData.map((task: DependencyItem, index: number) => {
                    const isFulfilled = task.status === 'fulfilled';
                    const isRejected = task.status === 'rejected';
                    const errorMessage: string | ReactNode =
                        isRejected && task.reason.id
                            ? `${UNABLE_TO_FETCH_MESSAGE} with ID ${task.reason.id}`
                            : `${UNABLE_TO_FETCH_MESSAGE}`;

                    return (
                        <li key={index}>
                            {isFulfilled ? (
                                <Link
                                    href={`/tasks/${task.value.id}`}
                                    key={index}
                                >
                                    <span
                                        onClick={() =>
                                            navigateToTask(task.value.id)
                                        }
                                    >
                                        {task.value.title}
                                    </span>
                                </Link>
                            ) : (
                                <span>{errorMessage}</span>
                            )}
                        </li>
                    );
                })}
            </ol>
        );
    }
    return <p>No Dependencies</p>;
};

export default DependencyList;
