import { TASKS_URL } from '@/constants/url';
import { api } from './api';
import { taskDetailsDataType } from '@/interfaces/taskDetails.type';

export const taskDetailsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTaskDetails: build.query<taskDetailsDataType, string>({
            query: (taskId): string => `${TASKS_URL}/${taskId}/details`,
            providesTags: ['Task_Details'],
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

export const { useGetTaskDetailsQuery, useUpdateTaskDetailsMutation } =
    taskDetailsApi;
