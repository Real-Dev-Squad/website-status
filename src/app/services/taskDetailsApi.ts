import { BASE_URL, TASKS_URL } from '@/constants/url';
import { api } from './api';
import { taskDetailsDataType } from '@/interfaces/taskDetails.type';
import {
    BaseQueryApi,
    FetchArgs,
    FetchBaseQueryError,
    FetchBaseQueryMeta,
} from '@reduxjs/toolkit/dist/query';
import {
    BaseQueryExtraOptions,
    BaseQueryFn,
    QueryReturnValue,
} from '@reduxjs/toolkit/dist/query/baseQueryTypes';
import { MaybePromise } from '@reduxjs/toolkit/dist/query/tsHelpers';

export type dependency = PromiseSettledResult<{
    title: string | undefined;
    id: string;
}>[];

const getTasksDependencyDetailsQueryFn = async (
    taskIds: string[],
    _queryApi: BaseQueryApi,
    _extraOptions: BaseQueryExtraOptions<BaseQueryFn>,
    baseQuery: (
        arg: string | FetchArgs
    ) => MaybePromise<
        QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>
    >
) => {
    try {
        const taskDetailsPromise = taskIds.map(async (taskId) => {
            const result = await baseQuery(`${TASKS_URL}/${taskId}/details`);
            if (result.error) {
                throw { error: result.error, id: taskId };
            }

            const task = result?.data as taskDetailsDataType;

            return {
                title: task?.taskData?.title,
                id: taskId,
            };
        });

        const taskDetails = await Promise.allSettled(taskDetailsPromise);
        return { data: taskDetails };
    } catch (error) {
        console.error(error);
        return {
            error: error as FetchBaseQueryError,
        };
    }
};

export const taskDetailsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTaskDetails: build.query<taskDetailsDataType, string>({
            query: (taskId): string => `${TASKS_URL}/${taskId}/details`,
            providesTags: ['Task_Details'],
        }),
        getTasksDependencyDetails: build.query<dependency, string[]>({
            queryFn: getTasksDependencyDetailsQueryFn,
        }),
        updateTaskDetails: build.mutation({
            query: ({ editedDetails, taskID }) => {
                return {
                    url: `${TASKS_URL + '/' + taskID}`,
                    method: 'PATCH',
                    body: editedDetails,
                };
            },
            invalidatesTags: ['Task_Details'],
        }),
        getExtensionRequestDetails: build.query<taskDetailsDataType, string>({
            query: (taskId): string =>
                `${BASE_URL}/extension-requests?q=status%3APENDING%2CtaskId%3A${taskId}`,
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetTaskDetailsQuery,
    useUpdateTaskDetailsMutation,
    useGetTasksDependencyDetailsQuery,
    useGetExtensionRequestDetailsQuery,
} = taskDetailsApi;
