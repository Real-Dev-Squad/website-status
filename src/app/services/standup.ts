import { standupUpdateType } from '@/interfaces/standup.type';
import { api } from './api';

export const standupApi = api.injectEndpoints({
    endpoints: (build) => ({
        addStandUp: build.mutation<void, standupUpdateType>({
            query: (standupUpdate) => ({
                url: '/progress',
                method: 'POST',
                body: standupUpdate,
            }),
            invalidatesTags: ['Standup'],
        }),
    }),
});
