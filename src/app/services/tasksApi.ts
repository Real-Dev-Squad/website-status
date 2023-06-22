import task from '@/interfaces/task.type';
import { api } from './api';
import { MINE_TASKS_URL } from '@/constants/url';

type TasksQueryResponse = { message: string; tasks: task[] };
type TaskRequestPayload = { id: string; percentCompleted: number };

export const tasksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTasks: builder.query<TasksQueryResponse['tasks'], void>({
            query: () => '/tasks',
            providesTags: ['Tasks'],
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
        updateTasks: builder.mutation<void, TaskRequestPayload>({
            query: ({ id, ...patch }) => ({
                url: `tasks/${id}`,
                method: 'PATCH',
                body: patch,
            }),
            invalidatesTags: (_result, _err, { id }) => [
                {
                    type: 'Tasks',
                    id,
                },
            ],
        }),
    }),
});

export const {
    useGetAllTasksQuery,
    useGetMineTasksQuery,
    useUpdateTasksMutation,
} = tasksApi;
