import { IDLE_USERS_URL } from '@/components/constants/url';
import fetch from '@/helperFunctions/fetch';
import { IdleUser } from '@/interfaces/idleUser.type';

const fetchIdleUsers = async (): Promise<[string[], boolean]> => {
  try {
    const { requestPromise } = fetch({ url: IDLE_USERS_URL });
    const fetchPromise = await requestPromise;
    const { allUserStatus: idleUsers }: { allUserStatus: IdleUser[] } =
      fetchPromise.data;
    const idleUserNames = idleUsers.map((user) => user.username);

    return [idleUserNames, false];
  } catch (Error) {
    return [[], true];
  }
};

export default fetchIdleUsers;
