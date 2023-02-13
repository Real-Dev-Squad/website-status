import React from 'react';
import updateTasksStatus from '@/helperFunctions/updateTasksStatus';
import task from '@/interfaces/task.type';
import {
  ASSIGNED,
  COMPLETED,
  AVAILABLE,
  IN_PROGRESS,
  SMOKE_TESTING,
  NEEDS_REVIEW,
  IN_REVIEW,
  APPROVED,
  MERGED,
  SANITY_CHECK,
  REGRESSION_CHECK,
  RELEASED,
  VERIFIED,
  BLOCKED,
} from '@/components/constants/task-status';
const STATUS_ORDER = [
  ASSIGNED,
  COMPLETED,
  BLOCKED,
  AVAILABLE,
  IN_PROGRESS,
  SMOKE_TESTING,
  NEEDS_REVIEW,
  IN_REVIEW,
  APPROVED,
  MERGED,
  SANITY_CHECK,
  REGRESSION_CHECK,
  RELEASED,
  VERIFIED,
] as const;

type StatusOrderType = typeof STATUS_ORDER[number] //union of all status order
const getTaskMap = (tasksResponse:task[]) => {
  const tasks = updateTasksStatus(tasksResponse);
  tasks.sort((a: task, b: task) => +a.endsOn - +b.endsOn);
  tasks.sort(
    (a: task, b: task) =>
      STATUS_ORDER.indexOf(a.status as StatusOrderType) -
      STATUS_ORDER.indexOf(b.status as StatusOrderType)
  );
  const taskMap: any = {};
  tasks.forEach((item) => {
    if (item.status in taskMap) {
      taskMap[item.status] = [...taskMap[item.status], item];
    } else {
      taskMap[item.status] = [item];
    }
  });
  return taskMap
};

export default getTaskMap;
