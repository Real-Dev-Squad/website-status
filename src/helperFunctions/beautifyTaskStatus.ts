import { TASK_STATUS } from '@/interfaces/task-status';
import task from '../interfaces/task.type';

const beautifyTaskStatus = (tasks: Array<task>) => {
    return tasks.map((task) => {
        const beautifiedTaskStatus = task.status
            .toLowerCase()
            .split('_')
            .map((item) => item.charAt(0).toUpperCase() + item.slice(1))
            .join(' ');

        return { ...task, status: beautifiedTaskStatus };

    });
};

export default beautifyTaskStatus;
