import React from 'react';
import Details from './Details';
import TaskDropDown from '../tasks/TaskDropDown';
import styles from './task-details.module.scss';
import { taskStatusUpdateHandleProp } from '@/interfaces/task.type';

interface TaskDetailsSectionProps {
    isEditing: boolean;
    type: string;
    priority: string;
    status: string;
    link: string;
    handleTaskStatusUpdate: (props: taskStatusUpdateHandleProp) => void;
}

const TaskDetailsSection: React.FC<TaskDetailsSectionProps> = ({
    isEditing,
    type,
    priority,
    status,
    link,
    handleTaskStatusUpdate,
}) => {
    return (
        <div className={styles['sub_details_grid_container']}>
            <Details detailType={'Type'} value={type} />
            <Details detailType={'Priority'} value={priority} />
            {isEditing ? (
                <TaskDropDown
                    onChange={handleTaskStatusUpdate}
                    oldStatus={status}
                    oldProgress={0}
                />
            ) : (
                <Details detailType={'Status'} value={status} />
            )}
            <Details detailType={'Link'} value={link} />
        </div>
    );
};

export default React.memo(TaskDetailsSection);
