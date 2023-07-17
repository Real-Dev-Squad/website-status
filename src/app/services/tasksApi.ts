import task, {
    TaskRequestPayload,
    TasksResponseType,
    GetAllTaskParamType,
} from '@/interfaces/task.type';
import { api } from './api';
import { MINE_TASKS_URL, TASKS_URL } from '@/constants/url';

type TasksCreateMutationResponse = { message: string; task: task };

export const tasksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTasks: builder.query<TasksResponseType, GetAllTaskParamType>({
            query: ({ dev, status, nextPage, prevPage }) => {
                let url = dev ? `/tasks?status=${status}&dev=true` : '/tasks';

                if (nextPage) {
                    url = nextPage;
                }

                if (prevPage) {
                    url = prevPage;
                }

                return { url };
            },
            providesTags: ['Tasks'],

            transformResponse: (response: TasksResponseType) => {
                return {
                    tasks: response.tasks?.sort(
                        (a: task, b: task) => +a.endsOn - +b.endsOn
                    ),
                    next: response.next,
                    prev: response.prev,
                };
            },
        }),

        getMineTasks: builder.query<TasksResponseType, void>({
            query: () => MINE_TASKS_URL,
            providesTags: ['Mine_Tasks'],
        }),
        addTask: builder.mutation<TasksCreateMutationResponse, Partial<task>>({
            query: (task: task) => ({
                url: TASKS_URL,
                method: 'POST',
                body: task,
            }),
        }),

        updateSelfTask: builder.mutation<void, TaskRequestPayload>({
            query: (task: TaskRequestPayload) => ({
                url: `tasks/self/${task.id}`,
                method: 'PATCH',
                body: task.task,
            }),
            invalidatesTags: (_result, _err, { id }) => [
                {
                    type: 'Tasks',
                    id,
                },
            ],
        }),

        updateTask: builder.mutation<void, TaskRequestPayload>({
            // isDevEnabled is the Feature flag for status update based on task status. This flag is temporary and will be removed once the feature becomes stable.
            query: ({ task, id, isDevEnabled }: TaskRequestPayload) => ({
                url: isDevEnabled
                    ? `tasks/${id}?userStatusFlag=true`
                    : `tasks/${id}`,
                method: 'PATCH',
                body: task,
            }),
            invalidatesTags: (_result, _err, { id }) => [
                {
                    type: 'Tasks',
                    id,
                },
            ],
        }),
    }),
    overrideExisting: true,
});

export const {
    useGetAllTasksQuery,
    useGetMineTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useUpdateSelfTaskMutation,
} = tasksApi;
