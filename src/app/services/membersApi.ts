import { MEMBERS_IDLE } from '@/constants/url';
import { api } from './api';

type IdleMembersResponse = { idleMemberUserNames: string[] };
export const membersApi = api.injectEndpoints({
    endpoints: (build) => ({
        getIdleMembers: build.query<string[], void>({
            query: () => MEMBERS_IDLE,
            providesTags: ['Idle_Members'],
            transformResponse: (response: IdleMembersResponse) => {
                const filterMembers = response.idleMemberUserNames.filter(
                    (username: string) => username
                );
                const sortedIdleMembers = filterMembers.sort();

                return sortedIdleMembers;
            },
        }),
    }),
});

export const { useGetIdleMembersQuery } = membersApi;
