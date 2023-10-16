import { USERS_IDLE } from '@/constants/url';
import { api } from './api';
import { UserResponseData } from '@/types/AvailabilityPanel';
type IdleUsersResponse = { users: UserResponseData[] };

export const idleUsersApi = api.injectEndpoints({
    endpoints: (build) => ({
        getIdleUsers: build.query<string[], void>({
            query: () => USERS_IDLE,
            providesTags: ['Idle_Users'],
            transformResponse: (response: IdleUsersResponse) => {
                const IdleUsers = response.users.map((user) => user.username);
                IdleUsers.sort();
                return IdleUsers;
            },
        }),
    }),
});

export const { useGetIdleUsersQuery } = idleUsersApi;
