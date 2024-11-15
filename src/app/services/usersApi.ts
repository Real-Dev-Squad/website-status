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
type UserResponse = {
    message: string;
    user: userDataType;
};

export const usersApi = api.injectEndpoints({
    endpoints: (build) => ({
        getUsersByUsername: build.query<UsersResponse, UsernameQueryArgs>({
            query: ({ searchString, size = 5 }) =>
                `/users?search=${searchString}&size=${size}`,
            providesTags: ['Users'],
        }),
        getUsersByLink: build.query<UsersResponse, { paginatedLink: string }>({
            query: ({ paginatedLink }) => paginatedLink,
            providesTags: ['Users'],
        }),
        getUsers: build.query<UsersResponse, { size?: number }>({
            query: ({ size = 5 }) => `/users?size=${size}`,
            providesTags: ['Users'],
        }),
        getAllUsers: build.query<UsersResponse, void>({
            query: () => '/users',
            providesTags: ['Users'],
        }),
        getAllUsersByUsername: build.query<UsersResponse, UsernameQueryArgs>({
            query: ({ searchString }) => `/users?search=${searchString}`,
            providesTags: ['Users'],
        }),
        getUserDetailsById: build.query<UserResponse, UsernameQueryArgs>({
            query: ({ searchString }) => `/users?id=${searchString}`,
            providesTags: ['Users'],
        }),
    }),
});

export const {
    useGetUsersByLinkQuery,
    useGetUsersByUsernameQuery,
    useGetUsersQuery,
    useGetAllUsersByUsernameQuery,
    useGetAllUsersQuery,
    useGetUserDetailsByIdQuery,
} = usersApi;
