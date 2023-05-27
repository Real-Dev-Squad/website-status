import { standupUpdateType, userDetails } from '@/interfaces/standup.type';
import { api } from './api';

export const standupApi = api.injectEndpoints({
    endpoints: (build) => ({
        addStandup: build.mutation<void, standupUpdateType>({
            query: (standupUpdate) => ({
                url: '/progresses',
                method: 'POST',
                body: standupUpdate,
            }),
            invalidatesTags: ['Standup'],
        }),
        userStandupDetails: build.query<userDetails, string | undefined>({
            query: (id): string => `/progresses?userId=${id}`,
            providesTags: ['MissedUpdate'],
        }),
    }),
});

export const { useAddStandupMutation, useUserStandupDetailsQuery } = standupApi;
