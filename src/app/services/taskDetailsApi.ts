import { TASKS_URL } from '@/constants/url';
import { api } from './api';
import { taskDetailsDataType } from '@/interfaces/taskDetails.type';
import { FetchBaseQueryError } from '@reduxjs/toolkit/dist/query';

type dependency = PromiseSettledResult<{
    title: string | undefined;
    id: string;
}>[];

export const taskDetailsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTaskDetails: build.query<taskDetailsDataType, string>({
            query: (taskId): string => `${TASKS_URL}/${taskId}/details`,
            providesTags: ['Task_Details'],
        }),
        getTasksDependencyDetails: build.query<dependency, string[]>({
            queryFn: async (taskIds, _queryApi, _extraOptions, baseQuery) => {
                try {
                    const taskDetailsPromise = taskIds.map(async (taskId) => {
                        const result = await baseQuery(
                            `${TASKS_URL}/${taskId}/details`
                        );

                        if (result.error) {
                            throw { error: result.error, id: taskId };
                        }

                        const task = result?.data as taskDetailsDataType;
                        return {
                            title: task?.taskData?.title,
                            id: taskId,
                        };
                    });
                    const taskDetails = await Promise.allSettled(
                        taskDetailsPromise
                    );
                    return { data: taskDetails };
                } catch (error) {
                    return {
                        error: error as FetchBaseQueryError,
                    };
                }
            },
        }),
        updateTaskDetails: build.mutation({
            query: ({ editedDetails, taskID }) => {
                return {
                    url: `${TASKS_URL + '/' + taskID}`,
                    method: 'PATCH',
                    body: {
                        title: editedDetails.title,
                        purpose: editedDetails.purpose,
                    },
                };
            },
            invalidatesTags: ['Task_Details'],
        }),
    }),
});

export const {
    useGetTaskDetailsQuery,
    useUpdateTaskDetailsMutation,
    useGetTasksDependencyDetailsQuery,
} = taskDetailsApi;
