import { TASKS_URL } from '@/constants/url';
import { api } from './api';
import { TasksResponseType } from '@/interfaces/task.type';

export const tasksApi = api.injectEndpoints({
    endpoints: (build) => ({
        fetchSearchResults: build.query<TasksResponseType, string>({
            query: (term) => `${TASKS_URL}?q=searchTerm:${term}`,
            providesTags: ['Tasks'],
        }),
    }),
});

export const { useFetchSearchResultsQuery } = tasksApi;
