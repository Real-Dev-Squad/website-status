import { IdleUser } from '@/interfaces/idleUser.type';

export type TGetIdleUsersResponse = {
  message: string;
  totalUserStatus: number;
  allUserStatus: IdleUser[];
};
