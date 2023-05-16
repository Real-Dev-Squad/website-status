import { api } from './api';

export const progressesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        saveProgress: builder.mutation({
            query: (payload) => ({
                url: '/progresses',
                method: 'POST',
                body: payload,
                headers: {
                    credentials: 'include',
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }),
        }),
    }),
});

export const { useSaveProgressMutation } = progressesApi;
