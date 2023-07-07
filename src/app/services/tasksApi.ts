import task, { updateTaskDetails } from '@/interfaces/task.type';
import { api } from './api';
import { MINE_TASKS_URL, TASKS_URL } from '@/constants/url';

type TasksQueryResponse = { message: string; tasks: task[] };
type TasksCreateMutationResponse = { message: string; task: task };
type TaskRequestPayload = { task: updateTaskDetails; id: string };

export const tasksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTasks: builder.query<
            TasksQueryResponse['tasks'],
            { dev: boolean; status: string }
        >({
            query: ({ dev, status }) =>
                dev ? `/tasks?status=${status}&dev=true` : '/tasks',
            providesTags: (result) =>
                result
                    ? [
                          ...result.map(({ id }) => ({
                              type: 'Tasks' as const,
                              id,
                          })),
                          { type: 'Tasks' },
                      ]
                    : ['Tasks'],
            transformResponse: (response: TasksQueryResponse) => {
                return response?.tasks?.sort(
                    (a: task, b: task) => +a.endsOn - +b.endsOn
                );
            },
        }),

        getMineTasks: builder.query<TasksQueryResponse['tasks'], void>({
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
        updateTask: builder.mutation<void, TaskRequestPayload>({
            query: (task: TaskRequestPayload) => ({
                url: `tasks/${task.id}`,
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
    }),
    overrideExisting: true,
});

export const {
    useGetAllTasksQuery,
    useGetMineTasksQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
} = tasksApi;
