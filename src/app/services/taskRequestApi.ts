import { api } from './api';

type AddOrUpdateMutationQuery = {
    taskId: string;
    userId: string;
};

type AddOrUpdateMutationQueryRes =
    | { message: string }
    | { message: string; requestors: string[] };

export const taskRequestApi = api.injectEndpoints({
    endpoints: (build) => ({
        addOrUpdate: build.mutation<
            AddOrUpdateMutationQueryRes,
            AddOrUpdateMutationQuery
        >({
            query: (body) => ({
                url: 'taskRequests/addOrUpdate',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['TASK_REQUEST'],
        }),
    }),
});

export const { useAddOrUpdateMutation } = taskRequestApi;
