import { taskProgressResponse } from '@/types/ProgressUpdates';
import { api } from './api';

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
        getLatestProgress: builder.query({
            query: (payload) => `/progresses/?${payload}`,
            transformResponse: (response: taskProgressResponse) => {
                return response.data[0].date;
            },
        }),
    }),
});

export const { useSaveProgressMutation, useGetLatestProgressQuery } =
    progressesApi;
