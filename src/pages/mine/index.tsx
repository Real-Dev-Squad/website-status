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

const Content = () => {
    const [filteredTasks, setFilteredTasks] = useState<task[] | undefined>();
    const [assignees, setAssignees] = useState<string[]>([]);
    const [selectedTab, setSelectedTab] = useState<Tab>(Tab.ALL);
    const [title, setTitle] = useState<string>('');

    const inputValue = getInputValueFromTaskField(
        selectedTab,
        assignees,
        title
    );

    const { data: tasks, error, isLoading } = useGetMineTasksQuery();

    const getQueryParams = (searchString: string) => {
        return extractQueryParams(searchString);
    };

    const searchTasks = (searchString?: string) => {
        let activeTab = Tab.ALL;
        let activeTitle = '';
        let activeAssignees: string[] = [];

        if (searchString && tasks) {
            const { status, assignees, title } = getQueryParams(searchString);
            activeTab = getActiveTab(status);
            activeTitle = title;
            activeAssignees = assignees;
            setFilteredTasks(
                getFilteredTasks(tasks, activeTab, assignees, title)
            );
        }

        setSelectedTab(activeTab);
        setTitle(activeTitle);
        setAssignees(activeAssignees);
    };

    const filterTabHandler = (selectedTab: Tab) => {
        searchTasks(getInputValueFromTaskField(selectedTab, assignees, title));
    };

    useEffect(() => {
        setFilteredTasks(tasks);
    }, [tasks]);

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong! Please contact admin</p>;
    if (!tasks || tasks.length === 0) {
        return <p>{NO_TASKS_FOUND_MESSAGE}</p>;
    }

    return (
        <div className={styles.tasksContainer}>
            <TaskSearch
                onFilterDropdownSelect={(selectedTab: Tab) => {
                    filterTabHandler(selectedTab);
                }}
                filterDropdownActiveTab={selectedTab}
                inputValue={inputValue}
                onClickSearchButton={searchTasks}
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
