import { FC, useState, useContext } from 'react';
import Head from '@/components/head';
import Layout from '@/components/Layout';
import classNames from '@/styles/tasks.module.scss';
import task from '@/interfaces/task.type';
import Tabs from '@/components/Tabs';
import { Tab } from '@/interfaces/task.type';
import fetch from '@/helperFunctions/fetch';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import {
    IN_PROGRESS,
    SMOKE_TESTING,
    BLOCKED,
} from '@/components/constants/task-status';
import {
    TASKS_FETCH_ERROR_MESSAGE,
    NO_TASKS_FOUND_MESSAGE,
} from '@/components/constants/messages';
import updateTasksStatus from '@/helperFunctions/updateTasksStatus';
import { useAppContext } from '@/context';
import { isUserAuthorizedContext } from '@/context/isUserAuthorized';
import { TasksProvider } from '@/context/tasks.context';
import TaskList from '@/components/tasks/TaskList/TaskList';
import { TASKS_URL } from '@/components/constants/url';
import { useGetAllTasksQuery } from '@/app/services/tasksApi';

const { SUCCESS, ERROR } = ToastTypes;

const statusActiveList = [IN_PROGRESS, BLOCKED, SMOKE_TESTING];
async function updateCardContent(id: string, cardDetails: task) {
    try {
        const { requestPromise } = fetch({
            url: `${TASKS_URL}/${id}`,
            method: 'patch',
            data: cardDetails,
        });
        await requestPromise;
        toast(SUCCESS, 'Changes have been saved !');
    } catch (err: any) {
        if ('response' in err) {
            toast(ERROR, err.response.data.message);
            return;
        }
        toast(ERROR, err.message);
    }
}

const Index: FC = () => {
    const { state: appState } = useAppContext();
    const { data: tasks = [], isError, isLoading } = useGetAllTasksQuery();
    const { isEditMode } = appState;
    const isUserAuthorized = useContext(isUserAuthorizedContext);
    const isEditable = isUserAuthorized && isEditMode;
    const [activeTab, setActiveTab] = useState(Tab.ASSIGNED);

    const onSelect = (tab: Tab) => {
        setActiveTab(tab);
    };

    const tasksGroupedByStatus = updateTasksStatus(tasks).reduce(
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

    const renderTabSection = () => (
        <div className={classNames.tabsContainer}>
            <Tabs
                tabs={Object.values(Tab) as Tab[]}
                onSelect={onSelect}
                activeTab={activeTab}
            />
        </div>
    );

    const renderTaskList = () => (
        <div>
            {tasksGroupedByStatus[activeTab] ? (
                <TaskList
                    tasks={tasksGroupedByStatus[activeTab]}
                    isEditable={isEditable}
                    updateCardContent={updateCardContent}
                />
            ) : (
                <p>{NO_TASKS_FOUND_MESSAGE}</p>
            )}
        </div>
    );
    return (
        <Layout>
            <Head title="Tasks" />
            <TasksProvider>
                <div className={classNames.container}>
                    {isError && <p>{TASKS_FETCH_ERROR_MESSAGE}</p>}
                    {isLoading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            {Object.keys(tasksGroupedByStatus).length > 0 ? (
                                <div className={classNames.tasksContainer}>
                                    {renderTabSection()}
                                    {renderTaskList()}
                                </div>
                            ) : (
                                !isError && <p>{NO_TASKS_FOUND_MESSAGE}</p>
                            )}
                        </>
                    )}
                </div>
            </TasksProvider>
        </Layout>
    );
};

export default Index;
