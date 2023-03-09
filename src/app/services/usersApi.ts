import { api } from './api';
import userType from '@/interfaces/user.type';

type UsersResponse = {
    message: string;
    users: userType[];
    links: {
        next: string;
        prev: string;
    }
}

export const usersApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUsersByUsername: build.query<UsersResponse, string>({
            query: (searchString) => `/users?search=${searchString}&size=5`,
            providesTags: ['Users'],
        }),
        getUsersByLink: build.query<UsersResponse, string>({
            query: (paginatedLink) => paginatedLink,
            providesTags: ['Users'],
        }),
        getUsers: build.query<UsersResponse, void>({
            query: () => '/users',
            providesTags: ['Users'],
        }),
    })
})

export const { useGetUsersByLinkQuery, useGetUsersByUsernameQuery, useGetUsersQuery } = usersApi