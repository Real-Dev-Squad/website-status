import task from '@/interfaces/task.type';

export type dragDropProps = {
  idleMembers: Array<string>,
  unAssignedTasks: Array<task>,
};

export type droppableComponent = {
  droppableId: string,
  idleMembers: Array<string>,
  unAssignedTasks: Array<task>,
};
