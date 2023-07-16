import task, {
    updateTaskDetails,
    TasksResponseType,
    GetAllTaskParamType,
} from '@/interfaces/task.type';
import { api } from './api';
import { MINE_TASKS_URL, TASKS_URL } from '@/constants/url';
import { TASK_RESULT_SIZE } from '@/constants/constants';

type TasksCreateMutationResponse = { message: string; task: task };
type TaskRequestPayload = { task: updateTaskDetails; id: string };

export const tasksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTasks: builder.query<TasksResponseType, GetAllTaskParamType>({
            query: ({
                dev,
                status,
                size = TASK_RESULT_SIZE,
                nextTasks,
                prevTasks,
            }) => {
                let url = dev
                    ? `/tasks?status=${status}&dev=true&size=${size}`
                    : '/tasks';

                if (nextTasks) {
                    url = nextTasks;
                }

                if (prevTasks) {
                    url = prevTasks;
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
