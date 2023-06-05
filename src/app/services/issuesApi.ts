import { IssueItem } from '@/interfaces/issueItem.type';
import { api } from './api';
import { ISSUES_URL } from '@/constants/url';

type IssuesResponse = {
    message: string;
    issues: IssueItem[];
};

export const issuesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getOrgIssues: builder.query<IssuesResponse['issues'], string>({
            query: (searchText = '') => ({
                url: `${ISSUES_URL}?q=${searchText}`,
                method: 'GET',
            }),
            providesTags: (result) =>
                result
                    ? [
                          ...result.map((item) => ({
                              type: 'Issues' as const,
                              id: item.id,
                          })),
                          { type: 'Issues' },
                      ]
                    : ['Issues'],

            transformResponse: (response: IssuesResponse): IssueItem[] => {
                return response?.issues ?? [];
            },
        }),
    }),
});

export const { useGetOrgIssuesQuery, useLazyGetOrgIssuesQuery } = issuesApi;
