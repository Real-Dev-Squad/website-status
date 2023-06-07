import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { BASE_URL } from '@/constants/url';

const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: 'include',
});

export const api = createApi({
    baseQuery,
    /**
     * Tag types must be defined in the original API definition
     * for any tags that would be provided by injected endpoints
     */
    tagTypes: [
        'Users',
        'Status',
        'Tasks',
        'Task_Details',
        'TaskTag',
        'User',
        'Tags',
        'Levels',
        'Mine_Tasks',
        'User_Standup',
    ],
    /**
     * This api has endpoints injected in adjacent files,
     * which is why no endpoints are shown below.
     */
    endpoints: () => ({}),
});
