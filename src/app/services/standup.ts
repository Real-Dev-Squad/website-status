import { addStandup } from '@/interfaces/standup.type';
import { api } from './api';

export const standupApi = api.injectEndpoints({
    endpoints: (build) => ({
        addStandUp: build.mutation<void, addStandup>({
            query: (standupUpdate) => ({
                url: '/progress',
                method: 'POST',
                body: standupUpdate,
            }),
            invalidatesTags: ['STANDUP'],
        }),
    }),
});
