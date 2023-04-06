import fetch from '@/helperFunctions/fetch';
import React, { createContext, useContext, useState, useEffect } from 'react';
import levelType from '@/interfaces/level.type';
import tagType from '@/interfaces/tag.type';
import { ALL_LEVELS_URL, ALL_TAGS_URL } from '@/components/constants/url';

export type TaskContextType = {
    taskTags: tagType[] | null;
    taskLevels: levelType[] | null;
};

const TasksContext = createContext<TaskContextType>({
    taskTags: [],
    taskLevels: [],
});

export const TasksProvider = ({ children }: { children: React.ReactNode }) => {
    const [taskTags, setTaskTags] = useState<tagType[] | null>(null);
    const [taskLevels, setTaskLevels] = useState<levelType[] | null>(null);
    const value = {
        taskTags,
        taskLevels,
    };
    useEffect(() => {
        (async () => {
            const { requestPromise } = fetch({
                url: ALL_TAGS_URL,
            });
            const { data } = await requestPromise;
            setTaskTags(data.tags);
        })();

        (async () => {
            const { requestPromise } = fetch({
                url: ALL_LEVELS_URL,
            });
            const { data } = await requestPromise;
            const sortedTaskLevels = data.levels.sort(
                (a: levelType, b: levelType) => (a.value < b.value ? -1 : 1)
            );
            setTaskLevels(sortedTaskLevels);
        })();
    }, []);

    return (
        <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
    );
};

export const useTasksContext = () => {
    const context: TaskContextType = useContext(TasksContext);
    if (!context) {
        throw new Error('useTasksContext must be used within a TasksProvider');
    }
    return context;
};
