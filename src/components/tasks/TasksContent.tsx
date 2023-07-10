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
import updateCardContent from '@/helperFunctions/updateCardContent';
import { useEditMode } from '@/hooks/useEditMode';
import { useRouter } from 'next/dist/client/router';
import useUserData from '@/hooks/useUserData';

export const TasksContent = () => {
    const router = useRouter();
    const { dev = false } = router.query;
    const { isEditMode } = useEditMode();

    const { data: userData, isUserAuthorized } = useUserData();

    const isEditable = isUserAuthorized && isEditMode;
    const [activeTab, setActiveTab] = useState(Tab.IN_PROGRESS);
    const [nextPage, setNextPage] = useState<string>('');
    const [prevPage, setPrevPage] = useState<string>('');

    const {
        data: tasks = { tasks: [], next: '', prev: '' },
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
        if (tasks.next) {
            setPrevPage('');
            setNextPage(tasks.next);
        }
    };

    const fetchPrevTasks = () => {
        if (tasks.prev) {
            setNextPage('');
            setPrevPage(tasks.prev);
        }
    };

    const tasksGroupedByStatus = updateTasksStatus(tasks.tasks).reduce(
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
            if (tasks.tasks && tasks.tasks.length) {
                return (
                    <TaskList
                        tasks={tasks.tasks}
                        isEditable={isEditable}
                        updateCardContent={updateCardContent}
                    />
                );
            } else {
                return <p>{NO_TASKS_FOUND_MESSAGE}</p>;
            }
        }

        if (tasksGroupedByStatus[activeTab]) {
            return (
                <TaskList
                    tasks={tasksGroupedByStatus[activeTab]}
                    isEditable={isEditable}
                    updateCardContent={updateCardContent}
                />
            );
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
                        disabled={!tasks.prev}
                    >
                        Prev
                    </button>
                    <button
                        className={classNames.paginationButton}
                        onClick={fetchNextTasks}
                        disabled={!tasks.next}
                    >
                        Next
                    </button>
                </div>
            ) : null}
        </div>
    );
};
