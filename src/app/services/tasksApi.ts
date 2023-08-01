import task, {
    TaskRequestPayload,
    TasksResponseType,
    GetAllTaskParamType,
} from '@/interfaces/task.type';
import { api } from './api';
import { MINE_TASKS_URL, TASKS_URL } from '@/constants/url';
import { TASK_RESULT_SIZE } from '@/constants/constants';

type TasksQueryResponse = { message: string; tasks: task[] };
type TasksCreateMutationResponse = { message: string; task: task };

export const tasksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTasks: builder.query<TasksResponseType, GetAllTaskParamType>({
            query: ({
                status,
                size = TASK_RESULT_SIZE,
                nextTasks,
                prevTasks,
            }) => {
                let url = `/tasks?status=${status}&size=${size}`;

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
} = tasksApi;
