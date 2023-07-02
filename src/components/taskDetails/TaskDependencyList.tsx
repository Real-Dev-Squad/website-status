import Link from 'next/link';
import { FC } from 'react';
import classNames from './task-details.module.scss';
import { dependency } from '@/app/services/taskDetailsApi';

type Props = {
    loading: boolean;
    fetching: boolean;
    error: boolean;
    dependencyData: dependency | undefined;
    navigateToTask: (taskId: string) => void;
};
const renderTaskDependencyList = (
    loading: boolean,
    fetching: boolean,
    error: boolean,
    dependencyData: dependency | undefined,
    navigateToTask: (taskId: string) => void
) => {
    if (loading || fetching) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Unable to fetch dependency task</p>;
    }

    if (dependencyData && dependencyData.length) {
        return dependencyData.map(
            (
                task:
                    | PromiseFulfilledResult<{
                          title: string | undefined;
                          id: string;
                      }>
                    | PromiseRejectedResult,
                index: number
            ) => {
                const isFulfilled = task.status === 'fulfilled';
                const isRejected = task.status === 'rejected';
                const errorMessage =
                    isRejected && task.reason.id
                        ? `Unable to fetch this task with ID ${task.reason.id}`
                        : 'Unable to fetch this task';

                return (
                    <li key={index}>
                        {isFulfilled ? (
                            <Link href={`/tasks/${task.value.id}`} key={index}>
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
            }
        );
    }

    return <p>No Dependency</p>;
};

const TaskDependencyList: FC<Props> = ({
    loading,
    fetching,
    error,
    dependencyData,
    navigateToTask,
}) => {
    return (
        <ol className={classNames['task_dependency_list_container']}>
            {renderTaskDependencyList(
                loading,
                fetching,
                error,
                dependencyData,
                navigateToTask
            )}
        </ol>
    );
};

export default TaskDependencyList;
