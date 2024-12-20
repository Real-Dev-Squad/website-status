import { ElementRef } from 'react';
import styles from '@/styles/tasks.module.scss';
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
import TaskSearchDev from './TaskSearch/TaskSearch';
import TaskCardShimmer from '../Loaders/taskCardShimmer';

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
        useState<TabTasksData>(EMPTY_TASKS_DATA);
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
        dev,
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

    const searchButtonHandler = (searchString?: string) => {
        const { status, assignees, title } = extractQueryParams(
            searchString || inputValue
        );
        (searchString || inputValue) &&
            searchNewTasks(status as Tab, assignees, title);
    };

    useEffect(() => {
        let possibleInputValue = '';
        if (!dev || selectedTab !== Tab.ALL) {
            possibleInputValue += `${getQueryParamTab(selectedTab)} `;
        }
        if (queryAssignees) {
            possibleInputValue += `${getRouterQueryParamAssignee(
                queryAssignees
            )} `;
        }
        if (queryTitle) {
            possibleInputValue += `${getQueryParamTitle(queryTitle)} `;
        }

        setInputValue(possibleInputValue.trim());
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

    if (isLoading && dev)
        return (
            <div
                className={styles.taskSkeletonContainer}
                data-testid="task-skeleton-container"
            >
                {[...Array(5)].map((n: number, index) => (
                    <TaskCardShimmer key={index} />
                ))}
            </div>
        );

    if (isLoading) return <p>Loading...</p>;

    if (isError) return <p>{TASKS_FETCH_ERROR_MESSAGE}</p>;

    return (
        <div className={styles.tasksContainer}>
            <TaskSearchDev
                onFilterDropdownSelect={(selectedTab: Tab) =>
                    searchNewTasks(selectedTab, queryAssignees, queryTitle)
                }
                filterDropdownActiveTab={selectedTab}
                inputValue={inputValue}
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
