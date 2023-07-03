import { api } from './api';

type pullRequestType = {
    title: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    url: string;
};

type pullRequestResponseType = {
    message: string;
    pullRequests: Array<pullRequestType>;
};

type queryParamsType = {
    prType: string;
    page?: number;
    numberOfCards?: number;
};

const prsApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getPrs: builder.query<
            pullRequestResponseType,
            queryParamsType | undefined
        >({
            query: ({ prType, page, numberOfCards }: queryParamsType) => {
                return {
                    url: `/pullrequests/${prType}`,
                    params: { page, size: numberOfCards },
                };
            },
        }),
    }),
});

export const { useGetPrsQuery } = prsApi;
