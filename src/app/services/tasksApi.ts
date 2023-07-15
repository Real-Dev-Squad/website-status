import task, { updateTaskDetails } from '@/interfaces/task.type';
import { api } from './api';
import { MINE_TASKS_URL, TASKS_URL } from '@/constants/url';
import { ASSIGNED } from '@/constants/task-status';
import {
    THOUSAND_MILLI_SECONDS,
    FOURTEEN_DAYS,
    SECONDS_IN_A_DAY,
} from '@/constants/date';

type TasksQueryResponse = { message: string; tasks: task[] };
type TasksCreateMutationResponse = { message: string; task: task };
type TaskRequestPayload = { task: updateTaskDetails; id: string };
type AssignTaskPayload = { taskId: string; assignee: string };

export const assignTaskReducerStateBuilder = () => {
    const dateObject: Date = new Date();
    const startedOnEpoch: number =
        dateObject.getTime() / THOUSAND_MILLI_SECONDS;
    const endsOnEpoch: number =
        startedOnEpoch + FOURTEEN_DAYS * SECONDS_IN_A_DAY;
    const build = ({ assignee }: { assignee: string }) => {
        return {
            status: ASSIGNED,
            startedOn: startedOnEpoch,
            endsOn: endsOnEpoch,
            assignee,
        };
    };
    return build;
};

export const tasksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTasks: builder.query<TasksQueryResponse['tasks'], void>({
            query: () => '/tasks',
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
        assignTask: builder.mutation<AssignTaskPayload, AssignTaskPayload>({
            query: ({ taskId, assignee }: AssignTaskPayload) => ({
                url: `tasks/${taskId}`,
                method: 'PATCH',
                body: assignTaskReducerStateBuilder()({
                    assignee,
                }),
            }),
            invalidatesTags: (_result, _err, { taskId }) => [
                {
                    type: 'Tasks',
                    id: taskId,
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
    useAssignTaskMutation,
} = tasksApi;
