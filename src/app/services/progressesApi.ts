import { api } from './api';
import { userDetails } from '@/types/standup.type';

export const progressesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        saveProgress: builder.mutation({
            query: (payload) => ({
                url: '/progresses',
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    credentials: 'include',
                    'Content-type': 'application/json',
                },
            }),
        }),
        userProgressDetails: builder.query<userDetails, string | undefined>({
            query: (id): string => `/progresses?userId=${id}`,
            providesTags: ['User_Standup'],
        }),
    }),
});

export const { useSaveProgressMutation, useUserProgressDetailsQuery } =
    progressesApi;
