import { api } from './api';
import challengeDataType from '@/interfaces/challenge.type';

type ChallengesQueryResponse = {
    message: string;
    challenges: challengeDataType[];
};

export const challengesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getChallenges: builder.query<ChallengesQueryResponse, void>({
            query: () => '/challenges',
            providesTags: ['Challenges'],
            transformResponse: (response: ChallengesQueryResponse) => {
                return response;
            },
        }),
    }),
});

export const { useGetChallengesQuery } = challengesApi;
