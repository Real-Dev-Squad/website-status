import { ITEMS_URL, ITEM_BY_FILTER_URL } from '@/components/constants/url';
import { api } from './api';
import taskItem, { taskItemPayload } from '@/interfaces/taskItem.type';

type TasksQueryResponse = { message: string; data: taskItem[] };

export const taskTagsApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTaskTags: build.query<taskItem[], { itemId: string }>({
            query: ({ itemId }) =>
                `${ITEM_BY_FILTER_URL}/?itemType=TASK&itemId=${itemId}`,
            providesTags: (_result, _err, { itemId }) => [
                { type: 'TASK', itemId },
            ],
            transformResponse: (response: TasksQueryResponse) => {
                return response.data;
            },
        }),
        updateTaskTagLevel: build.mutation<
            taskItem[],
            {
                taskItemToUpdate: taskItem;
                itemId: string;
            }
        >({
            query: ({ taskItemToUpdate, itemId }) => {
                const body: taskItemPayload = {
                    itemId: itemId,
                    itemType: 'TASK',
                    tagPayload: [
                        {
                            levelId: taskItemToUpdate.levelId,
                            tagId: taskItemToUpdate.tagId,
                        },
                    ],
                };
                return { url: ITEMS_URL, method: 'POST', data: body };
            },
            invalidatesTags: () => [{ type: 'TASK' }],
        }),
        deleteTaskTagLevel: build.mutation<
            taskItem[],
            { taskItemToUpdate: Partial<taskItem>; itemId: string }
        >({
            query: ({ taskItemToUpdate, itemId }) => {
                const body: taskItemPayload = {
                    itemId: itemId,
                    itemType: 'TASK',
                    tagId: taskItemToUpdate.tagId,
                };
                return { url: ITEMS_URL, method: 'DELETE', data: body };
            },
            invalidatesTags: () => [{ type: 'TASK' }],
        }),
    }),
});

export const {
    useGetTaskTagsQuery,
    useUpdateTaskTagLevelMutation,
    useDeleteTaskTagLevelMutation,
} = taskTagsApi;
