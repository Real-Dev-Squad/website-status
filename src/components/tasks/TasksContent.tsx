import { ElementRef } from 'react';
import classNames from '@/styles/tasks.module.scss';
import { useGetAllTasksQuery } from '@/app/services/tasksApi';
import task, { TABS, Tab, TabTasksData } from '@/interfaces/task.type';
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

type RenderTaskListProps = {
    tab: string;
    dev: boolean;
    tasks: task[];
};

const RenderTaskList = ({ tab, dev, tasks }: RenderTaskListProps) => {
    const tasksGroupedByStatus = tasks?.reduce(
        (acc: Record<string, task[]>, curr: task) => {
            return acc[curr.status as keyof task]
                ? {
                      ...acc,
                      [curr.status]: [...acc[curr.status as keyof task], curr],
                  }
                : { ...acc, [curr.status]: [curr] };
        },
        {}
    );

    const tasksNotAvailable =
        tasks === undefined || tasksGroupedByStatus[tab] === undefined;

    if (tasksNotAvailable || tasks.length === 0) {
        return <p>{NO_TASKS_FOUND_MESSAGE}</p>;
    }

    if (dev) {
        return <TaskList tasks={tasks} />;
    }

    return <TaskList tasks={tasksGroupedByStatus[tab]} />;
};

type routerQueryParams = {
    section?: string;
};
export const TasksContent = ({ dev }: { dev: boolean }) => {
    const router = useRouter();
    const { section }: routerQueryParams = router.query;
    const selectedTab = getActiveTab(section);
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

    const {
        data: tasksData = { tasks: [], next: '' },
        isError,
        isLoading,
        isFetching,
    } = useGetAllTasksQuery({
        dev: dev as boolean,
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
                section: tabToUrlParams(tab),
            },
        });
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
    }, [tasksData.tasks]);

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
                <RenderTaskList
                    dev={dev}
                    tab={selectedTab}
                    tasks={loadedTasks[selectedTab]}
                />
            </div>

            <div ref={loadingRef}>{isFetching ? 'Loading...' : null}</div>
        </div>
    );
};
