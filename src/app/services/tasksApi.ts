import task from '@/interfaces/task.type';
import { api } from './api';

type TasksQueryResponse = {
    message: string;
    tasks: task[];
};

export const tasksApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getAllTasks: builder.query<TasksQueryResponse, void>({
            query: () => '/tasks',
            providesTags: ['Tasks'],
            transformResponse: (response: TasksQueryResponse) => {
                return {
                    ...response,
                    tasks: response.tasks.sort(
                        (a: task, b: task) => +a.endsOn - +b.endsOn
                    ),
                };
            },
        }),
        getMineTasks: builder.query<TasksQueryResponse, void>({
            query: () => '/tasks/mine',
            providesTags: ['Tasks'],
        }),
    }),
});

export const { useGetAllTasksQuery, useGetMineTasksQuery } = tasksApi;
