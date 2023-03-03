import { BASE_URL } from '@/components/constants/url';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { HYDRATE } from 'next-redux-wrapper';

export const statusApi = createApi({
  reducerPath: 'statusApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.realdevsquad.com' }),
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
  }),
});

export const { useGetAllStatusQuery, useGetIdleStatusQuery } = statusApi;
