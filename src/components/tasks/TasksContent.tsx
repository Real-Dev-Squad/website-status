import classNames from '@/styles/tasks.module.scss';
import { useGetAllTasksQuery } from '@/app/services/tasksApi';
import task, { Tab, TabTasksData } from '@/interfaces/task.type';
import { useState, useEffect } from 'react';
import {
    NO_TASKS_FOUND_MESSAGE,
    TASKS_FETCH_ERROR_MESSAGE,
} from '../../constants/messages';
import { TabSection } from './TabSection';
import TaskList from './TaskList/TaskList';
import { useRouter } from 'next/router';
import { getActiveTab } from '@/utils/getActiveTab';

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
                section: tab.toLowerCase(),
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

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>{TASKS_FETCH_ERROR_MESSAGE}</p>;

    return (
        <div className={classNames.tasksContainer}>
            <TabSection onSelect={onSelect} activeTab={selectedTab} />
            <div>
                <RenderTaskList
                    dev={dev}
                    tab={selectedTab}
                    tasks={loadedTasks[selectedTab]}
                />
            </div>

            {dev && (
                <button
                    className={classNames.loadMoreButton}
                    onClick={fetchMoreTasks}
                    disabled={!tasksData.next}
                >
                    {isFetching ? 'Loading...' : 'Load More'}
                </button>
            )}
        </div>
    );
};
