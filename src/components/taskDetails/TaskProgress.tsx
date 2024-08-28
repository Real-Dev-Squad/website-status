// src/components/taskDetails/TaskProgress.tsx
import React from 'react';
import Progress from '../ProgressCard';
import { ProgressDetailsData } from '@/types/standup.type';
import styles from './task-details.module.scss';

interface TaskProgressProps {
    taskProgress: ProgressDetailsData[];
}

const TaskProgress: React.FC<TaskProgressProps> = ({ taskProgress }) => {
    return (
        <div>
            <Progress taskProgress={taskProgress} />
        </div>
    );
};

export default React.memo(TaskProgress);
