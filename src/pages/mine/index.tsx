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
import Card from '@/components/tasks/card';
import { useRouter } from 'next/router';

const ContentDev = () => {
    const [filteredTasks, setFilteredTasks] = useState<task[] | undefined>();
    const [selectedTab, setSelectedTab] = useState<Tab>(Tab.ALL);
    const [title, setTitle] = useState<string>('');

    const inputValue = getInputValueFromTaskField(selectedTab, title);

    const { data: tasks, error, isLoading } = useGetMineTasksQuery();

    const getQueryParams = (searchString: string) => {
        return extractQueryParams(searchString);
    };

    const searchTasks = (searchString?: string) => {
        let activeTab = Tab.ALL;
        let activeTitle = '';

        if (searchString && tasks) {
            const { status, title } = getQueryParams(searchString);
            activeTab = getActiveTab(status);
            activeTitle = title;
            setFilteredTasks(getFilteredTasks(tasks, activeTab, title));
        }

        setSelectedTab(activeTab);
        setTitle(activeTitle);
    };

    const filterTabHandler = (selectedTab: Tab) => {
        searchTasks(getInputValueFromTaskField(selectedTab, title));
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

function CardList({ tasks }: { tasks: task[] }) {
    return (
        <>
            {tasks.map((item) => (
                <Card
                    content={item}
                    key={item.id}
                    shouldEdit={false}
                    onContentChange={undefined}
                />
            ))}
        </>
    );
}

const Content = () => {
    const { data: tasks, error, isLoading } = useGetMineTasksQuery();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Something went wrong! Please contact admin</p>;
    if (tasks?.length)
        return (
            <div className={styles.mineTasksContainer}>
                <CardList tasks={tasks} />
            </div>
        );
    return <p>{NO_TASKS_FOUND_MESSAGE}</p>;
};

const Mine: FC = () => {
    const { isLoading: isAuthenticating, isLoggedIn } = useAuthenticated();
    const router = useRouter();
    const dev = router.query.dev === 'true' ? true : false;

    return (
        <Layout>
            <Head title="Mine" />
            <div className={styles.container}>
                {isAuthenticating ? (
                    <Loader />
                ) : isLoggedIn ? (
                    dev ? (
                        <ContentDev />
                    ) : (
                        <Content />
                    )
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
