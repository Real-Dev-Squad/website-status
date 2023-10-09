import { ElementRef } from 'react';
import classNames from '@/styles/tasks.module.scss';
import { useGetAllTasksQuery } from '@/app/services/tasksApi';
import { Tab, TabTasksData } from '@/interfaces/task.type';
import { useState, useEffect, useRef } from 'react';
import {
    NO_TASKS_FOUND_MESSAGE,
    TASKS_FETCH_ERROR_MESSAGE,
} from '../../constants/messages';
import { EMPTY_TASKS_DATA } from '@/constants/tasks';

import TaskList from './TaskList/TaskList';
import { useRouter } from 'next/router';
import { getActiveTab } from '@/utils/getActiveTab';
import {
    extractQueryParams,
    getQueryParamTab,
    getAPIQueryParamAssignee,
    getRouterQueryParamAssignee,
    getQueryParamTitle,
} from '@/utils/taskQueryParams';

import useIntersection from '@/hooks/useIntersection';
import TaskSearch from './TaskSearch/TaskSearch';

export const TasksContent = ({ dev }: { dev?: boolean }) => {
    const router = useRouter();
    const qQueryParam = router.query.q as string;
    const {
        status: taskStatus,
        assignees: queryAssignees,
        title: queryTitle,
    } = extractQueryParams(qQueryParam);
    const selectedTab = getActiveTab(taskStatus);
    const apiQueryAssignees = getAPIQueryParamAssignee(queryAssignees);

    const [nextTasks, setNextTasks] = useState<string>('');
    const [loadedTasks, setLoadedTasks] =
        useState<TabTasksData>(
        );
    const loadingRef = useRef<ElementRef<'div'>>(null);
    const [inputValue, setInputValue] = useState<string>(
        `${getQueryParamTab(selectedTab)} ${
            queryAssignees ? getRouterQueryParamAssignee(queryAssignees) : ''
        } ${queryTitle ? getQueryParamTitle(queryTitle) : ''}`
    );

    const {
        data: tasksData = { tasks: [], next: '' },
        isError,
        isLoading,
        isFetching,
    } = useGetAllTasksQuery({
        status: selectedTab,
        assignee: apiQueryAssignees,
        title: queryTitle,
        nextTasks,
    });

    const fetchMoreTasks = () => {
        if (tasksData.next) {
            setNextTasks(tasksData.next);
        }
    };

    const searchNewTasks = (tab: Tab, assignees?: string[], title?: string) => {
        const queryParamValue = `${getQueryParamTab(tab)} ${
            assignees ? getRouterQueryParamAssignee(assignees) : ''
        } ${title ? getQueryParamTitle(title) : ''}`.trim();
        router.push({
            query: {
                ...router.query,
                q: queryParamValue,
            },
        });
        setNextTasks('');
    };

    const searchInputHandler = (value: string) => {
        setInputValue(value);
    };

    const searchButtonHandler = () => {
        const { status, assignees, title } = extractQueryParams(inputValue);
        inputValue && searchNewTasks(status as Tab, assignees, title);
    };

    useEffect(() => {
        setInputValue(
            `${getQueryParamTab(selectedTab)} ${
                queryAssignees
                    ? getRouterQueryParamAssignee(queryAssignees)
                    : ''
            } ${queryTitle ? getQueryParamTitle(queryTitle) : ''}`
        );
    }, [selectedTab]);

    useEffect(() => {
        setLoadedTasks(EMPTY_TASKS_DATA);
    }, [router.query]);

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

    const searchButtonHandler = () => {
        const { status, assignee, title } = extractQueryParams(inputValue);
        setQueryTitle(title);
        setQueryAssignee(assignee);
        setLoadedTasks({
            ALL: [],
            IN_PROGRESS: [],
            ASSIGNED: [],
            AVAILABLE: [],
            UNASSIGNED: [],
            NEEDS_REVIEW: [],
            IN_REVIEW: [],
            VERIFIED: [],
            MERGED: [],
            COMPLETED: [],
            OVERDUE: [],
            DONE: [],
        });
        inputValue && onSelect(status as Tab, assignee, title);
    };

    return (
        <div className={classNames.tasksContainer}>
            <TaskSearch
                dev={dev}
                onSelect={(selectedTab: Tab) =>
                    searchNewTasks(selectedTab, queryAssignees, queryTitle)
                }
                inputValue={inputValue}
                activeTab={selectedTab}
                onInputChange={(value) => searchInputHandler(value)}
                onClickSearchButton={searchButtonHandler}
            />

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
