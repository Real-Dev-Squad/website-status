import { ElementRef } from 'react';
import classNames from '@/styles/tasks.module.scss';
import { useGetAllTasksQuery } from '@/app/services/tasksApi';
import { Tab, TabTasksData } from '@/interfaces/task.type';
import { useState, useEffect, useRef } from 'react';
import {
    NO_TASKS_FOUND_MESSAGE,
    TASKS_FETCH_ERROR_MESSAGE,
} from '../../constants/messages';
import TaskList from './TaskList/TaskList';
import { useRouter } from 'next/router';
import { getActiveTab } from '@/utils/getActiveTab';
import {
    extractQueryParams,
    getQueryParamTab,
    getQueryParamAssignee,
    getQueryParamTitle,
} from '@/utils/taskQueryParams';

import useIntersection from '@/hooks/useIntersection';
import TaskSearch from './TaskSearch/TaskSearch';

export const TasksContent = ({ dev }: { dev?: boolean }) => {
    const router = useRouter();
    const qQueryParam = router.query.q as string;
    const extractedValues = extractQueryParams(qQueryParam);
    const selectedTab = getActiveTab(extractedValues.status);
    const [queryTitle, setQueryTitle] = useState<string>(extractedValues.title);
    const [queryAssignee, setQueryAssignee] = useState<string>(
        extractedValues.assignee
    );
    const [nextTasks, setNextTasks] = useState<string>('');
    const [loadedTasks, setLoadedTasks] = useState<TabTasksData>({
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
    const loadingRef = useRef<ElementRef<'div'>>(null);
    const [inputValue, setInputValue] = useState<string>(
        `${getQueryParamTab(selectedTab)} ${
            queryAssignee ? getQueryParamAssignee(queryAssignee) : ''
        } ${queryTitle ? getQueryParamTitle(queryTitle) : ''}`
    );

    const {
        data: tasksData = { tasks: [], next: '' },
        isError,
        isLoading,
        isFetching,
    } = useGetAllTasksQuery({
        status: selectedTab,
        assignee: queryAssignee,
        title: queryTitle,
        nextTasks,
    });

    const fetchMoreTasks = () => {
        if (tasksData.next) {
            setNextTasks(tasksData.next);
        }
    };
    const onSelect = (tab: Tab, assignee?: string, title?: string) => {
        const queryParamValue = `${getQueryParamTab(tab)} ${
            assignee ? getQueryParamAssignee(assignee) : ''
        } ${title ? getQueryParamTitle(title) : ''}`.trim();
        router.push({
            query: {
                ...router.query,
                q: queryParamValue,
            },
        });
        setNextTasks('');
    };

    useEffect(() => {
        setInputValue(
            `${getQueryParamTab(selectedTab)} ${
                queryAssignee ? getQueryParamAssignee(queryAssignee) : ''
            } ${queryTitle ? getQueryParamTitle(queryTitle) : ''}`
        );
    }, [selectedTab, queryAssignee, queryTitle]);

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

    const searchInputHandler = (value: string) => {
        setInputValue(value);
    };

    return (
        <div className={classNames.tasksContainer}>
            <TaskSearch
                dev={dev}
                onSelect={(selectedTab: Tab) =>
                    onSelect(selectedTab, queryAssignee, queryTitle)
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
