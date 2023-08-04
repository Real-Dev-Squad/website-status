import { ElementRef } from 'react';
import classNames from '@/styles/tasks.module.scss';
import { useGetAllTasksQuery } from '@/app/services/tasksApi';
import { TABS, Tab, TabTasksData } from '@/interfaces/task.type';
import { useState, useEffect, useRef } from 'react';
import {
    NO_TASKS_FOUND_MESSAGE,
    TASKS_FETCH_ERROR_MESSAGE,
} from '../../constants/messages';
import { TabSection } from './TabSection';
import TaskList from './TaskList/TaskList';
import { useRouter } from 'next/router';
import { getActiveTab, tabToUrlParams } from '@/utils/getActiveTab';

import { Select } from '../Select';
import { getChangedStatusName } from '@/utils/getChangedStatusName';
import useIntersection from '@/hooks/useIntersection';
import TaskSearch from './TaskSearch/TaskSearch';

type routerQueryParams = {
    q?: string;
};
export const TasksContent = () => {
    const router = useRouter();
    const { q }: routerQueryParams = router.query;
    const selectedTab = getActiveTab(q);
    const [nextTasks, setNextTasks] = useState<string>('');
    const [loadedTasks, setLoadedTasks] = useState<TabTasksData>({
        IN_PROGRESS: [],
        ASSIGNED: [],
        AVAILABLE: [],
        NEEDS_REVIEW: [],
        IN_REVIEW: [],
        VERIFIED: [],
        MERGED: [],
        COMPLETED: [],
    });
    const loadingRef = useRef<ElementRef<'div'>>(null);
    const [inputValue, setInputValue] = useState<string>('');

    const {
        data: tasksData = { tasks: [], next: '' },
        isError,
        isLoading,
        isFetching,
    } = useGetAllTasksQuery({
        status: selectedTab,
        nextTasks,
    });

    const fetchMoreTasks = () => {
        if (tasksData.next) {
            setNextTasks(tasksData.next);
        }
    };

    const onSelect = (tab: Tab) => {
        router.push({
            query: {
                ...router.query,
                q: tabToUrlParams(tab),
            },
        });
        console.log(q);
        setNextTasks('');
    };

    useEffect(() => {
        if (tasksData.tasks && tasksData.tasks.length && !isFetching) {
            const newTasks: TabTasksData = JSON.parse(
                JSON.stringify(loadedTasks)
            );
            newTasks[selectedTab] = newTasks[selectedTab].filter(
                (task) =>
                    !tasksData.tasks.some((newTask) => newTask.id === task.id)
            );

            newTasks[selectedTab].push(...tasksData.tasks);

            setLoadedTasks(newTasks);
        }
    }, [tasksData.tasks, selectedTab]);

    useIntersection({
        loadingRef,
        onLoadMore: fetchMoreTasks,
        earlyReturn: loadedTasks[selectedTab].length === 0,
    });

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>{TASKS_FETCH_ERROR_MESSAGE}</p>;

    const taskSelectOptions = TABS.map((item) => ({
        label: getChangedStatusName(item),
        value: item,
    }));

    return (
        <div className={classNames.tasksContainer}>
            <TaskSearch
                tabs={TABS}
                onSelect={() => onSelect}
                inputOnChangeHandler={() => {
                    setInputValue(inputValue);
                }}
                inputtedValue={inputValue}
                activeTab={selectedTab}
            />
            <div
                className={classNames['status-tabs-container']}
                data-testid="status-tabs-container"
            >
                <TabSection onSelect={onSelect} activeTab={selectedTab} />
            </div>
            <div
                className={classNames['status-select-container']}
                data-testid="status-select-container"
            >
                <Select
                    value={{
                        label: getChangedStatusName(selectedTab),
                        value: selectedTab,
                    }}
                    onChange={(selectedTaskStatus) => {
                        if (selectedTaskStatus) {
                            onSelect(selectedTaskStatus.value as Tab);
                        }
                    }}
                    options={taskSelectOptions}
                />
            </div>
            <div>
                {loadedTasks[selectedTab] && loadedTasks[selectedTab].length ? (
                    <TaskList tasks={loadedTasks[selectedTab]} />
                ) : (
                    !isFetching && <p>{NO_TASKS_FOUND_MESSAGE}</p>
                )}
            </div>

            <div ref={loadingRef}>{isFetching && 'Loading...'}</div>
        </div>
    );
};
