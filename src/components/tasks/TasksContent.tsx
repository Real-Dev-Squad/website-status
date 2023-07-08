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
    } = useGetAllTasksQuery({
        dev: dev as boolean,
        status: activeTab,
        nextPage: nextPage,
        prevPage: prevPage,
    });

    const fetchNextTasks = () => {
        if (tasks.next) {
            setNextPage(tasks.next);
        }
    };

    const fetchPrevTasks = () => {
        if (tasks.prev) {
            setPrevPage(tasks.prev);
        }
    };

    const onSelect = (tab: Tab) => {
        setActiveTab(tab);
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

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>{TASKS_FETCH_ERROR_MESSAGE}</p>;

    return (
        <div className={classNames.tasksContainer}>
            <TabSection onSelect={onSelect} activeTab={activeTab} />
            <div>
                {dev === 'true' ? (
                    tasks.tasks && tasks.tasks.length ? (
                        <TaskList
                            tasks={tasks.tasks}
                            isEditable={isEditable}
                            updateCardContent={updateCardContent}
                        />
                    ) : (
                        <p>{NO_TASKS_FOUND_MESSAGE}</p>
                    )
                ) : tasksGroupedByStatus[activeTab] ? (
                    <TaskList
                        tasks={tasksGroupedByStatus[activeTab]}
                        isEditable={isEditable}
                        updateCardContent={updateCardContent}
                    />
                ) : (
                    <p>{NO_TASKS_FOUND_MESSAGE}</p>
                )}
            </div>
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
