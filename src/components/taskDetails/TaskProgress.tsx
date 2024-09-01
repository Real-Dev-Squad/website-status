import React from 'react';
import Progress from '../ProgressCard';
import { ProgressDetailsData } from '@/types/standup.type';

interface TaskProgressProps {
    taskProgress: ProgressDetailsData[];
}

export const TaskProgress: React.FC<TaskProgressProps> = ({ taskProgress }) => {
    return (
        <div>
            <Progress taskProgress={taskProgress} />
        </div>
    );
};
