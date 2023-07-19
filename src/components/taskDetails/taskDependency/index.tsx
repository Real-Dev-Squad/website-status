import React, { ChangeEvent, FC, useState } from 'react';
import { Textarea } from '@/components/taskDetails';
import { TaskDependencyProps } from '@/interfaces/taskDetails.type';
import DependencyList from '@/components/taskDetails/taskDependency/DependencyList';
import { parseDependencyValue } from '@/utils/parseDependency';

const TaskDependency: FC<TaskDependencyProps> = ({
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
        const updatedDependencies = parseDependencyValue(value);
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
                    testId="dependency-textarea"
                />
            )}
            <DependencyList taskDependencyIds={taskDependencyIds} />
        </>
    );
};

export default TaskDependency;
