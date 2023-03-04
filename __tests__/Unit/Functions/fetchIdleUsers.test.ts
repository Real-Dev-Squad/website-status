import { IDLE_USERS_URL } from '@/components/constants/url';
import fetchIdleUsers from '@/helperFunctions/fetchIdleUsers';

describe('fetchIdleUsers', () => {
  it('should return an array of idle user names and error flag when the API call is successful', async () => {
    const expectedIdleUserNames = ['tom', 'jerry'];
    const data = {
      allUserStatus: [{ username: 'tom' }, { username: 'jerry' }],
    };
    const requestPromise = Promise.resolve({ data });
    const fetchSpy = jest
      .spyOn(require('@/helperFunctions/fetch'), 'default')
      .mockReturnValue({ requestPromise });
    const [idleUserNames, error] = await fetchIdleUsers();

    expect(fetchSpy).toHaveBeenCalledWith({ url: IDLE_USERS_URL });
    expect(idleUserNames).toEqual(expectedIdleUserNames);
    expect(error).toBe(false);
    fetchSpy.mockRestore();
  });

  it('should return an empty array and error flag when the API call fails', async () => {
    const requestPromise = Promise.reject();
    const fetchSpy = jest
      .spyOn(require('@/helperFunctions/fetch'), 'default')
      .mockReturnValue({ requestPromise });
    const [idleUserNames, error] = await fetchIdleUsers();

    expect(fetchSpy).toHaveBeenCalledWith({ url: IDLE_USERS_URL });
    expect(idleUserNames).toEqual([]);
    expect(error).toBe(true);
    fetchSpy.mockRestore();
  });
});
