import React from 'react';
import TaskDependency from '@/components/taskDetails/taskDependency';

interface TaskDependenciesProps {
    isEditing: boolean;
    taskDependencyIds: string[];
    setEditedTaskDetails: (taskDetails: any) => void;
}

const TaskDependencies: React.FC<TaskDependenciesProps> = ({
    isEditing,
    taskDependencyIds,
    setEditedTaskDetails,
}) => {
    return (
        <div>
            <TaskDependency
                taskDependencyIds={taskDependencyIds}
                isEditing={isEditing}
                setEditedTaskDetails={setEditedTaskDetails}
            />
        </div>
    );
};

export default React.memo(TaskDependencies);