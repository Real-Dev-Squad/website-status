import task from '../interfaces/task.type';

const updateTasksStatus = (tasks: Array<task>) => {
    const taskList: Array<task> = [];
    enum Status {
        active = 'IN_PROGRESS',
        pending = 'IN_PROGRESS',
        assigned = 'ASSIGNED',
        unassigned = 'AVAILABLE',
        completed = 'COMPLETED',
        blocked = 'BLOCKED',
    }

    return tasks.map((taskItem, index) => {
        return {
            ...taskItem,
            status: Status[taskList[index].status as keyof typeof Status],
        };
    });
};

export default updateTasksStatus;
