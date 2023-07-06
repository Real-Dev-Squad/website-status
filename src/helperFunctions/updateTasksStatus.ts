import task from '../interfaces/task.type';

const updateTasksStatus = (tasks: task[]): task[] => {
    return tasks.map((task) => {
        switch (task.status) {
            case 'active':
            case 'pending':
                return { ...task, status: 'IN_PROGRESS' };
            case 'assigned':
                return { ...task, status: 'ASSIGNED' };
            case 'unassigned':
                return { ...task, status: 'AVAILABLE' };
            case 'completed':
                return { ...task, status: 'COMPLETED' };
            case 'blocked':
                return { ...task, status: 'BLOCKED' };
            default:
                return task;
        }
    });
};

export default updateTasksStatus;
