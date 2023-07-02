import { api } from './api';
import {
    ChallengeMap,
    ChallengesQueryResponse,
} from '@/interfaces/challenge.type';

export const challengesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getChallenges: builder.query<ChallengeMap, void>({
            query: () => '/challenges',
            providesTags: ['Challenges'],
            transformResponse: (response: ChallengesQueryResponse) => {
                const challenges = response?.challenges || [];
                const challengeMap: ChallengeMap = {
                    Active: challenges?.filter((task) => task.is_active),
                    Completed: challenges?.filter((task) => !task.is_active),
                };
                return challengeMap;
            },
        }),
    }),
});

export const { useGetChallengesQuery } = challengesApi;
