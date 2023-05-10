import { api } from './api';
import challenge from '@/interfaces/challenge.type';

export const challengesApi = api.injectEndpoints({
    endpoints: (build) => ({
        getChallenges: build.query<challenge, void>({
            query: () => '/challenges',
            providesTags: ['Challenges'],
        }),
    }),
});




export const { useGetChallengesQuery } = challengesApi;