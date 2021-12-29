import task from '@/interfaces/task.type';

export type dragDropProps = {
  idleMembers: Array<string>,
  unAssignedTasks: Array<task>,
  refreshData:any,
};

export type droppableComponent = {
  droppableId: string,
  idleMembers: Array<string>,
  unAssignedTasks: Array<task>,
  isTaskOnDrag:boolean,
  searchTermMember: string,
  searchTermTask: string,
};

export type searchInputComponent = {
  droppableId: string,
  value:string,
  placeholder:string,
  type:string,
  onChangeMethod:Function,
};