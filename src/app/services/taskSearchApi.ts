import { TASKS_URL } from '@/constants/url';
import { api } from './api';
// import { taskDetailsDataType } from '@/interfaces/taskDetails.type';

export const tasksApi = api.injectEndpoints({
    endpoints: (build) => ({
        fetchSearchResults: build.query<any, string>({
            query: (term) =>
                `${TASKS_URL}?q=searchTerm:${encodeURIComponent(term)}`,
            providesTags: ['Tasks'],
        }),
    }),
});

export const { useFetchSearchResultsQuery } = tasksApi;
