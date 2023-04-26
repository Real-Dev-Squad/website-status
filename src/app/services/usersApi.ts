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

type UserDataResponse={
    id: string,
    incompleteUserDetails: boolean,
    roles: {
        archived: boolean,
        admin: boolean,
        super_user: boolean,
    },
    last_name: string,
    linkedin_id: string,
    picture: {
        publicId:string,
        url: string
    },
    yoe: number,
    github_display_name: string,
    github_id: string,
    company: string,
    designation: string,
    twitter_id: string,
    first_name: string,
    username: string
}

type UsernameQueryArgs = {
    searchString?: string;
    size?: number;
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
        getUserData: build.query<UserDataResponse, UsernameQueryArgs>({
            query: () => '/users/self',
            providesTags: ['Users'],
        }),
    }),
});

export const {
    useGetUsersByLinkQuery,
    useGetUsersByUsernameQuery,
    useGetUsersQuery,
    useGetUserDataQuery,
} = usersApi;
