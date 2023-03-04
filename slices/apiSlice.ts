import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';
import award from '@/interfaces/award.type';

interface ResponseData {
  id: string,
  title: string,
  purpose: string,
  featureUrl: string,
  type: string,
  links: string[],
  endsOn: string,
  startedOn: string,
  status: string,
  assignee?: string,
  percentCompleted: number,
  dependsOn: string[],
  participants?: string[],
  completionAward: award,
  lossRate: award,
  isNoteworthy: boolean,
  createdBy: string
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
    getAllTasks: builder.query<ResponseData, void>({
      query: () => '/tasks',
    }),
  }),
});

// export const tasksApi = createApi({
//   reducerPath: 'tasksApi',
//   baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_BASE_URL }),
//   extractRehydrationInfo(action, { reducerPath }) {
//     if (action.type === HYDRATE) {
//       return action.payload[reducerPath];
//     }
//   },
//   endpoints: (builder) => ({
//     getAllTasks: builder.query<ResponseData, void>({
//       query: () => '/tasks',
//     }),
//   }),
// });

// export const { useGetAllTasksQuery } = tasksApi

export const { useGetAllStatusQuery, useGetIdleStatusQuery, useGetAllTasksQuery } = statusApi;
