import { api } from './api';

import { PROGRESS_UPDATES_URL } from '@/components/constants/url';

import { getProgress, saveProgress } from '@/interfaces/progressUpdates.type';

export const progressUpdates = api.injectEndpoints({
    endpoints: (builder) => ({
        getLatestProgress: builder.query<getProgress, { taskId: string }>({
            query: ({ taskId })=>`${PROGRESS_UPDATES_URL}/${taskId}`
        }),
        saveLatestProgress: builder.mutation<saveProgress, {taskId: string, timestamp: string, progress: string, plan: string, blockers: string}>({
            query: ({ taskId, timestamp, progress, plan, blockers })=>{
                return {
                url: `${PROGRESS_UPDATES_URL}/save/${taskId}`,
                body: {timestamp, progress, plan,blockers}
            };
        }
        }),
    }),
});

export const {
    useGetLatestProgressQuery,
    useSaveLatestProgressMutation,
} = progressUpdates;