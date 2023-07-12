import classNames from '@/styles/tasks.module.scss';
import { useGetAllTasksQuery } from '@/app/services/tasksApi';
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

    const {
        data: tasks = [],
        isError,
        isLoading,
    } = useGetAllTasksQuery({
        dev: dev as boolean,
        status: activeTab,
    });

    const onSelect = (tab: Tab) => {
        setActiveTab(tab);
    };

    const tasksGroupedByStatus = tasks.reduce(
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

    if (isError) return <p>{TASKS_FETCH_ERROR_MESSAGE}</p>;

    if (isLoading) return <p>Loading...</p>;

    const renderTaskList = () => {
        if (dev === 'true' && tasks.length > 0) {
            return <TaskList tasks={tasks} />;
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
        </div>
    );
};
