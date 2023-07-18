import classNames from '@/styles/tasks.module.scss';
import { useGetAllTasksQuery } from '@/app/services/tasksApi';
import task, { Tab } from '@/interfaces/task.type';
import { useState } from 'react';
import {
    NO_TASKS_FOUND_MESSAGE,
    TASKS_FETCH_ERROR_MESSAGE,
} from '../../constants/messages';
import { TabSection } from './TabSection';
import TaskList from './TaskList/TaskList';
import { TasksLoader } from './TasksLoader';
import PaginationButton from '../PaginationButton';
import { useRouter } from 'next/dist/client/router';

type routerQueryParams = {
    dev?: string | false;
    selected?: Tab;
};

export const TasksContent = () => {
    const router = useRouter();
    const { dev = false, selected = Tab.IN_PROGRESS }: routerQueryParams =
        router.query;

    const selectedTab = selected.toUpperCase();

    const [nextPage, setNextPage] = useState<string>('');
    const [prevPage, setPrevPage] = useState<string>('');

    const {
        data: tasksData = { tasks: [], next: '', prev: '' },
        isError,
        isLoading,
        isFetching,
    } = useGetAllTasksQuery({
        dev: dev as boolean,
        status: selectedTab,
        nextPage,
        prevPage,
    });

    const fetchNextTasks = () => {
        if (tasksData.next) {
            setPrevPage('');
            setNextPage(tasksData.next);
        }
    };

    const fetchPrevTasks = () => {
        if (tasksData.prev) {
            setNextPage('');
            setPrevPage(tasksData.prev);
        }
    };

    const tasksGroupedByStatus = tasksData.tasks?.reduce(
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

    const renderTaskList = () => {
        if (isFetching) {
            return <TasksLoader />;
        }

        if (dev === 'true' && tasksData.tasks?.length) {
            return <TaskList tasks={tasksData.tasks} />;
        }

        if (tasksGroupedByStatus && tasksGroupedByStatus[selectedTab]?.length) {
            return <TaskList tasks={tasksGroupedByStatus[selectedTab]} />;
        }

        return <p>{NO_TASKS_FOUND_MESSAGE}</p>;
    };

    const onSelect = (tab: Tab) => {
        router.push({
            query: {
                ...router.query,
                selected: tab.toLowerCase(),
            },
        });
        setNextPage('');
        setPrevPage('');
    };

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>{TASKS_FETCH_ERROR_MESSAGE}</p>;

    return (
        <div className={classNames.tasksContainer}>
            <TabSection onSelect={onSelect} activeTab={selectedTab as Tab} />
            <div>{renderTaskList()}</div>

            {dev === 'true' && (
                <PaginationButton
                    fetchPrev={fetchPrevTasks}
                    fetchNext={fetchNextTasks}
                    hasPrev={!!tasksData.prev}
                    hasNext={!!tasksData.next}
                />
            )}
        </div>
    );
};
