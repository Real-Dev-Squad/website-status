import { api } from './api';
import { userDataType } from '@/interfaces/user.type';
('@/interfaces/user.type');

type UsersResponse = {
    message: string;
    users: userDataType[];
    links: {
        next: string;
        prev: string;
    };
};

type UsernameQueryArgs = {
    searchString?: string;
    size?: number;
};

export const usersApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUsersByUsername: build.query<UsersResponse, UsernameQueryArgs>({
            query: ({ searchString, size = 5 }) =>
                `/users?search=${searchString}&size=${size}`,
            providesTags: (result) =>
                result
                    ? [
                          ...result['users'].map(({ username }) => ({
                              type: 'Users' as const,
                              id: username,
                          })),
                          'Users',
                      ]
                    : ['Users'],
        }),
        getUsersByLink: build.query<UsersResponse, { paginatedLink: string }>({
            query: ({ paginatedLink }) => paginatedLink,
            providesTags: ['Users'],
        }),
        getUsers: build.query<UsersResponse, { size?: number }>({
            query: ({ size = 5 }) => `/users?size=${size}`,
            providesTags: ['Users'],
        }),
    }),
});

export const {
    useGetUsersByLinkQuery,
    useGetUsersByUsernameQuery,
    useGetUsersQuery,
} = usersApi;
