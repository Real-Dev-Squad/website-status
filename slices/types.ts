import { IdleUser } from '@/interfaces/idleUser.type';
import task from '@/interfaces/task.type';

export type TGetIdleUsersResponse = {
  message: string;
  totalUserStatus: number;
  allUserStatus: IdleUser[];
};

export type TGetTasksResponse = {
  message: string;
  tasks: task[];
};
