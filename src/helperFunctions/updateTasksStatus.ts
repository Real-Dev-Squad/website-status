import task from '../interfaces/task.type';

const updateTasksStatus = (tasks: task[] = []): task[] => {
    return tasks.map((task) => {
        const { status, ...rest } = task;
        let updatedStatus;

        switch (status) {
            case 'active':
            case 'pending':
                updatedStatus = 'IN_PROGRESS';
                break;
            case 'assigned':
                updatedStatus = 'ASSIGNED';
                break;
            case 'unassigned':
                updatedStatus = 'AVAILABLE';
                break;
            case 'completed':
                updatedStatus = 'COMPLETED';
                break;
            case 'blocked':
                updatedStatus = 'BLOCKED';
                break;
            default:
                updatedStatus = status;
        }

        return { ...rest, status: updatedStatus };
    });
};

export default updateTasksStatus;
