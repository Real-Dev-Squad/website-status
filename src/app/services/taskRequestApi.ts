import { api } from './api';

type AddOrUpdateMutation = {
    taskId: string;
    userId: string;
};

export const taskRequestApi = api.injectEndpoints({
    endpoints: (build) => ({
        addOrUpdate: build.mutation({
            query: (body: AddOrUpdateMutation) => ({
                url: 'taskRequests/addOrUpdate',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['TASK_REQUEST'],
        }),
    }),
});

export const { useAddOrUpdateMutation } = taskRequestApi;
