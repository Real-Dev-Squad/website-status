import { USER_SELF } from '@/components/constants/url';
import { api } from './api';
import { userDataType } from '@/interfaces/user.type';

export const userApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUser: build.query<userDataType, void>({
            query: () => USER_SELF,
            providesTags: ['User'],
        }),
    }),
});

export const { useGetUserQuery } = userApi;
