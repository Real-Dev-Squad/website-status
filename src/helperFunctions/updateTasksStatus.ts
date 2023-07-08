import task from '../interfaces/task.type';

const updateTasksStatus = (tasks: Array<task>) => {
    const tasksStatusMap = {
        active: 'IN_PROGRESS',
        pending: 'IN_PROGRESS',
        assigned: 'ASSIGNED',
        unassigned: 'AVAILABLE',
        completed: 'COMPLETED',
        blocked: 'BLOCKED',
    };
    return tasks.map((taskItem) => {
        return {
            ...taskItem,
            status: tasksStatusMap[
                taskItem?.status as keyof typeof tasksStatusMap
            ],
        };
    });
};

export default updateTasksStatus;
