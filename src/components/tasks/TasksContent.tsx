import classNames from '@/styles/tasks.module.scss';
import { useGetAllTasksQuery } from '@/app/services/tasksApi';
import updateTasksStatus from '@/helperFunctions/updateTasksStatus';
import task, { Tab } from '@/interfaces/task.type';
import { useState } from 'react';
import {
    NO_TASKS_FOUND_MESSAGE,
    TASKS_FETCH_ERROR_MESSAGE,
} from '../../constants/messages';
import { TabSection } from './TabSection';
import TaskList from './TaskList/TaskList';
import { useRouter } from 'next/dist/client/router';

export const TasksContent = () => {
    const router = useRouter();
    const { dev = false } = router.query;
    const [activeTab, setActiveTab] = useState(Tab.IN_PROGRESS);
    const [nextPage, setNextPage] = useState<string>('');
    const [prevPage, setPrevPage] = useState<string>('');

    const {
        data: tasksData = { tasks: [], next: '', prev: '' },
        isError,
        isLoading,
        isFetching,
    } = useGetAllTasksQuery({
        dev: dev as boolean,
        status: activeTab,
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

    const tasksGroupedByStatus = tasksData.tasks.reduce(
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
    const onSelect = (tab: Tab) => {
        setActiveTab(tab);
        setNextPage('');
        setPrevPage('');
    };

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>{TASKS_FETCH_ERROR_MESSAGE}</p>;
    const renderTaskList = () => {
        if (isFetching) {
            return (
                <div className={classNames.loader}>
                    <div className={classNames.wrapper}>
                        <div className={classNames.line}></div>
                        <div className={classNames.line}></div>
                        <div className={classNames.line}></div>
                        <div className={classNames.line}></div>
                        <div className={classNames.line}></div>
                        <div className={classNames.line}></div>
                    </div>
                </div>
            );
        }

        if (dev === 'true') {
            if (tasksData.tasks && tasksData.tasks.length) {
                return <TaskList tasks={tasksData.tasks} />;
            } else {
                return <p>{NO_TASKS_FOUND_MESSAGE}</p>;
            }
        }

        if (tasksGroupedByStatus[activeTab]) {
            return <TaskList tasks={tasksGroupedByStatus[activeTab]} />;
        }

        return <p>{NO_TASKS_FOUND_MESSAGE}</p>;
    };

    return (
        <div className={classNames.tasksContainer}>
            <TabSection onSelect={onSelect} activeTab={activeTab} />
            <div>{renderTaskList()}</div>
            {dev === 'true' ? (
                <div className={classNames.paginationButtonContainer}>
                    <button
                        className={classNames.paginationButton}
                        onClick={fetchPrevTasks}
                        disabled={!tasksData.prev}
                    >
                        Prev
                    </button>
                    <button
                        className={classNames.paginationButton}
                        onClick={fetchNextTasks}
                        disabled={!tasksData.next}
                    >
                        Next
                    </button>
                </div>
            ) : null}
        </div>
    );
};
