import React, { ChangeEvent, FC, useState } from 'react';
// import classNames from './task-details.module.scss';
// import { dependency } from '@/app/services/taskDetailsApi';
import { Textarea } from '..';
import { Props } from '@/interfaces/taskDetails.type';
import DependencyList from './DependencyList';

const TaskDependency: FC<Props> = ({
    loading,
    fetching,
    dependencyData,
    error,
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

    return (
        <>
            {isEditing && (
                <Textarea
                    name="dependsOn"
                    value={editedDependencies.join(',')}
                    onChange={handleDependenciesChange}
                />
            )}
            <DependencyList
                dependencyData={dependencyData}
                navigateToTask={navigateToTask}
                loading={loading}
                error={error}
                fetching={fetching}
            />
        </>
    );
};

export default TaskDependency;
