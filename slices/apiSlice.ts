import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import task from '@/interfaces/task.type';

interface TaskResponse {
  message: string;
  tasks: task[]
}

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
    getIdleStatus: builder.query({
      query: (state) => `users/status?state=${state}`,
    }),
    getAllTasks: builder.query<TaskResponse, void>({
      query: () => '/tasks',
    }),
  }),
});

export const { useGetAllStatusQuery, useGetIdleStatusQuery, useGetAllTasksQuery } = statusApi;
