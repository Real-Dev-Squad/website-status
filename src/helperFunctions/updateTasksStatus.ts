import task from '../interfaces/task.type';

const updateTasksStatus = (tasks: Array<task>) => {
    const taskList: Array<task> = [];
    const status = {
        active: 'IN_PROGRESS',
        pending: 'IN_PROGRESS',
        assigned: 'ASSIGNED',
        unassigned: 'AVAILABLE',
        completed: 'COMPLETED',
        blocked: 'BLOCKED',
    };

    tasks.forEach((taskItem, index) => {
        taskList.push(taskItem);
        taskList[index].status = status[taskList[index].status as keyof typeof status];
    });
    return tasks;
};

export default updateTasksStatus;
