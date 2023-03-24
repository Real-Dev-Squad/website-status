import { IdleUser } from '@/interfaces/idleUser.type';
import task from '@/interfaces/task.type';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import { TGetIdleUsersResponse, TGetTasksResponse } from './types';

export const statusApi = createApi({
  reducerPath: 'statusApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
  extractRehydrationInfo(action, { reducerPath }) {
    if (action.type === HYDRATE) {
      return action.payload[reducerPath];
    }
  },
  endpoints: (builder) => ({
    getAllStatus: builder.query({
      query: () => 'users/status',
    }),
    getIdleStatus: builder.query<IdleUser[], string>({
      query: (state) => `users/status?state=${state}`,
      transformResponse: (response: TGetIdleUsersResponse) =>
        response.allUserStatus,
    }),
    getAllTasks: builder.query<task[], unknown>({
      query: () => '/tasks',
      transformResponse: (response: TGetTasksResponse) => response.tasks,
    }),
  }),
});

export const {
  useGetAllStatusQuery,
  useGetIdleStatusQuery,
  useGetAllTasksQuery,
} = statusApi;
