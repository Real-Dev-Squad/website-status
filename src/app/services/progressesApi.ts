import { api } from './api';
import { DetailsProps } from '@/types/standup.type';

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
        userProgressDetails: builder.query<DetailsProps, string | undefined>({
            query: (id): string => `/progresses?userId=${id}`,
            providesTags: ['User_Standup'],
        }),
        taskProgressDetails: builder.query<DetailsProps, string | undefined>({
            query: (id): string => `/progresses?taskId=${id}`,
            providesTags: ['User_Task'],
        }),
    }),
});

export const {
    useSaveProgressMutation,
    useUserProgressDetailsQuery,
    useTaskProgressDetailsQuery,
} = progressesApi;
