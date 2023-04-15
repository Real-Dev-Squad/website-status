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

    tasks.forEach((taskItem, index) => {
        taskList.push(taskItem);
        taskList[index].status =
            Status[taskList[index].status as keyof typeof Status];
    });
    return tasks;
};

export default updateTasksStatus;
