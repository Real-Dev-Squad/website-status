import classNames from '@/styles/tasks.module.scss';
import { useGetAllTasksQuery } from '@/app/services/tasksApi';
import updateTasksStatus from '@/helperFunctions/updateTasksStatus';
import { Tab } from '@/interfaces/task.type';
import { useState } from 'react';
import {
    NO_TASKS_FOUND_MESSAGE,
    TASKS_FETCH_ERROR_MESSAGE,
} from '../../constants/messages';
import { TabSection } from './TabSection';
import TaskList from './TaskList/TaskList';

export const TasksContent = () => {
    const { data: tasks = [], isError, isLoading } = useGetAllTasksQuery();

    const [activeTab, setActiveTab] = useState(Tab.IN_PROGRESS);

    const onSelect = (tab: Tab) => {
        setActiveTab(tab);
    };

    const tasksGroupedByStatus = updateTasksStatus(tasks);

    if (isError) return <p>{TASKS_FETCH_ERROR_MESSAGE}</p>;

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className={classNames.tasksContainer}>
            <TabSection onSelect={onSelect} activeTab={activeTab} />
            <div>
                {tasksGroupedByStatus[activeTab] ? (
                    <TaskList tasks={tasksGroupedByStatus[activeTab]} />
                ) : (
                    <p>{NO_TASKS_FOUND_MESSAGE}</p>
                )}
            </div>
        </div>
    );
};
