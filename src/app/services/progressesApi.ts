import { api } from './api';
import { progressDetails } from '@/types/standup.type';

type queryParamsType = {
    userId?: string;
    taskId?: string;
    dev?: boolean;
};

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
        getProgressDetails: builder.query<progressDetails, queryParamsType>({
            query: ({ userId, taskId, dev }: queryParamsType) => {
                return {
                    url: '/progresses',
                    params: { userId, taskId, dev },
                };
            },
            providesTags: ['Progress_Details'],
        }),
    }),
});

export const { useSaveProgressMutation, useGetProgressDetailsQuery } =
    progressesApi;
