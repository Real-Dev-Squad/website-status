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
                const filterMembers = response.users.map(
                    (user) => user.username
                );
                const sortedIdleMembers = filterMembers.sort();

                return sortedIdleMembers;
            },
        }),
    }),
});

export const { useGetIdleUsersQuery } = idleUsersApi;
