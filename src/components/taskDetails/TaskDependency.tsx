import Link from 'next/link';
import { ChangeEvent, FC, useState } from 'react';
import classNames from './task-details.module.scss';
import { dependency } from '@/app/services/taskDetailsApi';
import { Textarea } from '.';

type Props = {
    loading: boolean;
    fetching: boolean;
    error: boolean;
    dependencyData: dependency | undefined;
    navigateToTask: (taskId: string) => void;
    isEditing: boolean;
    updatedDependencies: string[];
    handleChange: (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void;
};

const TaskDependency: FC<Props> = ({
    loading,
    fetching,
    error,
    dependencyData,
    navigateToTask,
    isEditing,
    updatedDependencies,
    handleChange,
}) => {
    const [editedDependencies, setEditedDependencies] =
        useState<string[]>(updatedDependencies);

    const handleDependenciesChange = (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { value } = event.target;
        const updatedDependencies = value
            .split(',')
            .map((taskId) => taskId.trim());
        setEditedDependencies(updatedDependencies);
        handleChange(event);
    };

    const renderDependencyList = () => {
        if (loading || fetching) {
            return <p>Loading...</p>;
        }

        if (error) {
            return <p>Unable to fetch dependency tasks</p>;
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
                }
            );
        }
        return <p>No dependencies</p>;
    };

    return (
        <>
            {isEditing && (
                <Textarea
                    name="dependsOn"
                    value={editedDependencies.join(',')}
                    onChange={handleDependenciesChange}
                />
            )}
            <ol className={classNames['task_dependency_list_container']}>
                {renderDependencyList()}
            </ol>
        </>
    );
};

export default TaskDependency;
