import React, { ChangeEvent, FC, useState } from 'react';
// import { dependency } from '@/app/services/taskDetailsApi';
import { Textarea } from '..';
import { Props } from '@/interfaces/taskDetails.type';
import DependencyList from './DependencyList';

const TaskDependency: FC<Props> = ({
    taskDependencyIds,
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
        // .filter((taskId) => taskId !== '');
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
            <DependencyList taskDependencyIds={taskDependencyIds} />
        </>
    );
};

export default TaskDependency;
