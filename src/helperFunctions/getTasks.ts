import task from '@/interfaces/task.type';

export const appendNewTasks = (
  taskList: task[],
  unAssignedTasks: task[]
  ) :task[] => {
    const oldTasksIds = taskList.map((Task: task) => Task.id);
    const newTasks = unAssignedTasks.filter((Task: task) => !oldTasksIds.includes(Task.id));
    return [...taskList, ...newTasks];
};