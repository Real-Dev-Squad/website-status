import React from 'react';
import updateTasksStatus from '@/helperFunctions/updateTasksStatus';
import task from '@/interfaces/task.type';

const getTaskMap = (tasksResponse: task[]) => {
  const tasks = updateTasksStatus(tasksResponse);
  tasks.sort((a: task, b: task) => +a.endsOn - +b.endsOn);

  const taskMap: Record<string, task[]> = {};
  tasks.forEach((item) => {
    if (item.status in taskMap) {
      taskMap[item.status] = [...(taskMap[item.status] ?? []), item];
    } else {
      taskMap[item.status] = [item];
    }
  });
  return taskMap;
};

export default getTaskMap;
