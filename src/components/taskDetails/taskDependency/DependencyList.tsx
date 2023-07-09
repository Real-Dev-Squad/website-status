import React from 'react';
import Link from 'next/link';
import { Props1 } from '@/interfaces/taskDetails.type';
import classNames from '../task-details.module.scss';
import { useRouter } from 'next/router';
import { useGetTasksDependencyDetailsQuery } from '@/app/services/taskDetailsApi';
// import { dependency } from '@/app/services/taskDetailsApi';

type DependencyItem =
    | PromiseFulfilledResult<{
          title: string | undefined;
          id: string;
      }>
    | PromiseRejectedResult;

const DependencyList: React.FC<Props1> = ({ taskDependencyIds }) => {
    const router = useRouter();
    const navigateToTask = (taskId: string) => {
        router.push(`/tasks/${taskId}`);
    };
    const {
        data: dependencyData,
        isLoading: loading,
        isFetching: fetching,
        isError: error,
    } = useGetTasksDependencyDetailsQuery(taskDependencyIds);

    if (loading || fetching) {
        return <p>Loading...</p>;
    }
    if (error) {
        return <>Unable to fetch dependency tasks</>;
    } else if (dependencyData && dependencyData.length) {
        return (
            <ol className={classNames['task_dependency_list_container']}>
                {dependencyData.map((task: DependencyItem, index: number) => {
                    const isFulfilled = task.status === 'fulfilled';
                    const isRejected = task.status === 'rejected';
                    const errorMessage =
                        isRejected && task.reason.id
                            ? `Unable to fetch this task with ID ${task.reason.id}`
                            : 'Unable to fetch this task';

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
    } else {
        return <p>No Dependencies</p>;
    }
};

export default DependencyList;
