import { ALL_LEVELS_URL, ALL_TAGS_URL } from '@/constants/url';
import { api } from './api';
import tagType from '@/interfaces/tag.type';
import levelType from '@/interfaces/level.type';

type TagsResponse = { message: string; tags: tagType[] };
type LevelsResponse = { message: string; levels: levelType[] };

export const tagssApi = api.injectEndpoints({
    endpoints: (build) => ({
        getTags: build.query<TagsResponse['tags'], void>({
            query: () => ALL_TAGS_URL,
            providesTags: ['Tags'],
            transformResponse: (response: TagsResponse) => {
                return response.tags;
            },
        }),
        getLevels: build.query<LevelsResponse['levels'], void>({
            query: () => ALL_LEVELS_URL,
            providesTags: ['Levels'],
            transformResponse: (response: LevelsResponse) => {
                return response.levels.sort((a: levelType, b: levelType) =>
                    a.value < b.value ? -1 : 1
                );
            },
        }),
    }),
});

export const { useGetTagsQuery, useGetLevelsQuery } = tagssApi;
