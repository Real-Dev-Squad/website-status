import { api } from './api';
import userType from '@/interfaces/user.type';

export type UsersResponse = {
    message: string;
    users: userType[];
    links: {
        next: string;
        prev: string;
    }
}

type UsernameQueryArgs = {
    searchString?: string;
    size?: number;
    paginatedLink?: string;
}

export const usersApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUsersByUsername: build.query<UsersResponse, UsernameQueryArgs>({
            query: ({searchString, size = 5, paginatedLink}) => {
                if(paginatedLink) return `${paginatedLink}`
                return `/users?search=${searchString}&size=${size}`
            },
            providesTags: ['Users'],
        }),
        getUsersByLink: build.query<UsersResponse, { paginatedLink: string }>({
            query: ({paginatedLink}) => paginatedLink,
            providesTags: ['Users'],
        }),
        getUsers: build.query<UsersResponse, { size?: number }>({
            query: ({size = 5}) => `/users?size=${size}`,
            providesTags: ['Users'],
        }),
    })
})

export const { useGetUsersByLinkQuery, useGetUsersByUsernameQuery, useGetUsersQuery } = usersApi