import { api } from './api';
import { UserStatus } from '@/interfaces/userStatus.type';

type StatusResponse = {
    message: string;
    totalUserStatus: number;
    allUserStatus: UserStatus[];
}

export const statusApi = api.injectEndpoints({
    endpoints: (build) => ({
        getAllStatus: build.query<StatusResponse, void>({
            query: () => '/users/status',
            providesTags: ['Status']
          }),
          getIdleStatus: build.query<StatusResponse, string>({
            query: (state) => `/users/status?state=${state}`,
            providesTags: ['Status']
          }),
    })
})


export const { useGetAllStatusQuery, useGetIdleStatusQuery } = statusApi;