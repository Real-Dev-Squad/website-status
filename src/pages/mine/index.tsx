import { FC, useEffect, useState } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import styles from '@/styles/tasks.module.scss';
import task, { Tab } from '@/interfaces/task.type';
import { LOGIN_URL } from '@/constants/url';
import { NO_TASKS_FOUND_MESSAGE } from '@/constants/messages';
import useAuthenticated from '@/hooks/useAuthenticated';
import { useGetMineTasksQuery } from '@/app/services/tasksApi';
import { Loader } from '@/components/tasks/card/Loader';
import TaskSearch from '@/components/tasks/TaskSearch/TaskSearch';
import { extractQueryParams } from '@/utils/taskQueryParams';
import { getActiveTab } from '@/utils/getActiveTab';
import TaskList from '@/components/tasks/TaskList/TaskList';
import getInputValueFromTaskField from '@/utils/getInputValueFromTaskField';
import getFilteredTasks from '@/utils/getFilteredTasks';
import TaskCardShimmer from '@/components/Loaders/taskCardShimmer';

export const searchTasks = (
    setFilteredTasks: (tasks: task[]) => void,
    setSelectedTab: (tab: Tab) => void,
    setTitle: (title: string) => void,
    searchString?: string,
    tasks?: task[]
) => {
    if (searchString && tasks) {
        const { status, title } = extractQueryParams(searchString);
        const tab = getActiveTab(status);
        setFilteredTasks(getFilteredTasks(tasks, tab, title));
        setSelectedTab(tab);
        setTitle(title);
    }
};

const Content = () => {
    const [filteredTasks, setFilteredTasks] = useState<task[] | undefined>();
    const [selectedTab, setSelectedTab] = useState<Tab>(Tab.ALL);
    const [title, setTitle] = useState<string>('');

    const inputValue = getInputValueFromTaskField(selectedTab, title);

    const { data: tasks, error, isLoading } = useGetMineTasksQuery();

    const searchButtonHandler = (searchString?: string) => {
        searchTasks(
            setFilteredTasks,
            setSelectedTab,
            setTitle,
            searchString,
            tasks
        );
    };

    useEffect(() => {
        setFilteredTasks(tasks);
    }, [tasks]);

    if (isLoading)
        return (
            <div className={styles.mineTasksContainer}>
                {[...Array(5)].map((n: number, index) => (
                    <TaskCardShimmer key={index} />
                ))}
            </div>
        );

    if (error) return <p>Something went wrong! Please contact admin</p>;
    if (!tasks) return <p>{NO_TASKS_FOUND_MESSAGE}</p>;
    if (tasks.length === 0) return <p>{NO_TASKS_FOUND_MESSAGE}</p>;

    return (
        <div className={styles.tasksContainer}>
            <TaskSearch
                onFilterDropdownSelect={(selectedTab: Tab) => {
                    searchButtonHandler(
                        getInputValueFromTaskField(selectedTab, title)
                    );
                }}
                filterDropdownActiveTab={selectedTab}
                inputValue={inputValue}
                onClickSearchButton={searchButtonHandler}
            />
            {!filteredTasks || filteredTasks.length === 0 ? (
                <p>{NO_TASKS_FOUND_MESSAGE}</p>
            ) : (
                <TaskList tasks={filteredTasks} />
            )}
        </div>
    );
};

const Mine: FC = () => {
    const { isLoading: isAuthenticating, isLoggedIn } = useAuthenticated();

    return (
        <Layout>
            <Head title="Mine" />
            <div className={styles.container}>
                {isAuthenticating ? (
                    <Loader />
                ) : isLoggedIn ? (
                    <Content />
                ) : (
                    <div>
                        <p>You are not Authorized</p>
                        <a href={LOGIN_URL} target="_blank" rel="noreferrer">
                            Click here to Login
                        </a>
                    </div>
                )}
            </div>
        </Layout>
    );
};
export default Mine;
