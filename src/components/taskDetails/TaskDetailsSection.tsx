import React from 'react';
import Details from './Details';
import TaskDropDown from '../tasks/TaskDropDown';
import ProgressContainer from '../tasks/card/progressContainer';
import task, { taskStatusUpdateHandleProp } from '@/interfaces/task.type';
import styles from './task-details.module.scss';

interface TaskDetailsSectionProps {
    isEditing: boolean;
    type: string;
    priority: string;
    status: string;
    link: string;
    percentCompleted: number;
    handleTaskStatusUpdate: (props: taskStatusUpdateHandleProp) => void;
    taskDetailsData: task; // Include this to pass the entire task object
}

const TaskDetailsSection: React.FC<TaskDetailsSectionProps> = ({
    isEditing,
    type,
    priority,
    status,
    link,
    percentCompleted,
    handleTaskStatusUpdate,
    taskDetailsData, // Pass the entire task object
}) => {
    return (
        <div className={styles['sub_details_grid_container']}>
            <Details detailType={'Type'} value={type} />
            <Details detailType={'Priority'} value={priority} />
            {isEditing ? (
                <TaskDropDown
                    onChange={handleTaskStatusUpdate}
                    oldStatus={status}
                    oldProgress={percentCompleted}
                />
            ) : (
                <>
                    <Details detailType={'Status'} value={status} />
                    <ProgressContainer
                        content={taskDetailsData}
                        key={percentCompleted}
                    />
                </>
            )}
            <Details detailType={'Link'} value={link} />
        </div>
    );
};

export default React.memo(TaskDetailsSection);
