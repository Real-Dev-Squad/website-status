import React from 'react';
import Progress from '../ProgressCard';
import { ProgressDetailsData } from '@/types/standup.type';

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
