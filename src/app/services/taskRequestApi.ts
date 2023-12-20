import { api } from './api';

type AddOrUpdateMutationQuery = {
    taskId?: string;
    userId?: string;
    externalIssueUrl?: string;
    externalIssueHtmlUrl: string;
    requestType: string;
    description: string | undefined;
    proposedStartDate: number | string;
    proposedDeadline: number | string;
};

type AddOrUpdateMutationQueryRes = {
    message: string;
    data: {
        id: string;
    };
};

export const taskRequestApi = api.injectEndpoints({
    endpoints: (build) => ({
        addOrUpdate: build.mutation<
            AddOrUpdateMutationQueryRes,
            AddOrUpdateMutationQuery
        >({
            query: (body) => ({
                url: 'taskRequests',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['TASK_REQUEST'],
        }),
    }),
});

export const { useAddOrUpdateMutation } = taskRequestApi;
