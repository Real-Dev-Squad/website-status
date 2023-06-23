import classNames from '@/styles/tasks.module.scss';
// import { useGetAllTasksQuery } from '@/app/services/tasksApi';

import { isUserAuthorizedContext } from '@/context/isUserAuthorized';
import updateTasksStatus from '@/helperFunctions/updateTasksStatus';
import task, { Tab, tasksCountObject } from '@/interfaces/task.type';
import { useContext, useState, useEffect } from 'react';
import { STATUS_ORDER } from '@/constants/task-status';
import {
    NO_TASKS_FOUND_MESSAGE,
    TASKS_FETCH_ERROR_MESSAGE,
} from '../../constants/messages';
import { TASKS_URL } from '@/constants/url';
import { TabSection } from './TabSection';
import TaskList from './TaskList/TaskList';
import updateCardContent from '@/helperFunctions/updateCardContent';
import useFetch from '@/hooks/useFetch';
import useUpdateTask from '@/hooks/useUpdateTask';
import groupTasksByStatus from '@/utils/groupTasksByStatus';
import { useEditMode } from '@/hooks/useEditMode';

export const TasksContent = () => {
    // TODO: the below code should be used when mutation for updating tasks is implemented
    // const { data: tasks = [], isError, isLoading } = useGetAllTasksQuery();
    const { isEditMode } = useEditMode();
    const isUserAuthorized = useContext(isUserAuthorizedContext);
    const isEditable = isUserAuthorized && isEditMode;
    const [activeTab, setActiveTab] = useState(Tab.ASSIGNED);

    const startingTasksCount: tasksCountObject = {
        ASSIGNED: 0,
        COMPLETED: 0,
        AVAILABLE: 0,
        IN_PROGRESS: 0,
        NEEDS_REVIEW: 0,
        IN_REVIEW: 0,
        VERIFIED: 0,
        MERGED: 0,
    };
    const [tasksCount, setTasksCount] =
        useState<tasksCountObject>(startingTasksCount);

    // TODO: the below code should removed when mutation for updating tasks is implemented
    const [filteredTask, setFilteredTask] = useState<any>([]);
    // TODO: the below code should removed when mutation for updating tasks is implemented
    const { response, isLoading, error } = useFetch(TASKS_URL);
    // TODO: the below code should removed when mutation for updating tasks is implemented
    const updateTask = useUpdateTask(filteredTask, setFilteredTask);

    const onSelect = (tab: Tab) => {
        setActiveTab(tab);
    };

    function getTasksCount(passedTasksArray: task[]) {
        const tasksCount: tasksCountObject = {
            ASSIGNED: 0,
            COMPLETED: 0,
            AVAILABLE: 0,
            IN_PROGRESS: 0,
            NEEDS_REVIEW: 0,
            IN_REVIEW: 0,
            VERIFIED: 0,
            MERGED: 0,
        };
        passedTasksArray.forEach((task: task) => {
            tasksCount[task.status as Tab] += 1;
        });

        return tasksCount;
    }

    // TODO: the useEffect should be removed when mutation for updating tasks is implemented
    useEffect(() => {
        if ('tasks' in response) {
            const tasksCount = getTasksCount(response.tasks);
            setTasksCount(tasksCount);
            const tasks = updateTasksStatus(response.tasks);
            tasks.sort((a: task, b: task) => +a.endsOn - +b.endsOn);
            tasks.sort(
                (a: task, b: task) =>
                    STATUS_ORDER.indexOf(a.status) -
                    STATUS_ORDER.indexOf(b.status)
            );
            const taskMap: any = groupTasksByStatus(tasks);
            setFilteredTask(taskMap);
        }
        return () => {
            setFilteredTask([]);
        };
    }, [isLoading, response]);

    // TODO: the below code should be used when mutation for updating tasks is implemented
    /*
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
    */

    if (error) return <p>{TASKS_FETCH_ERROR_MESSAGE}</p>;

    if (isLoading) return <p>Loading...</p>;

    return (
        <div className={classNames.tasksContainer}>
            <TabSection
                onSelect={onSelect}
                activeTab={activeTab}
                tasksCount={tasksCount}
            />
            <div>
                {filteredTask[activeTab] ? (
                    <TaskList
                        tasks={filteredTask[activeTab]}
                        isEditable={isEditable}
                        updateCardContent={updateCardContent}
                        updateTask={updateTask}
                    />
                ) : (
                    <p>{NO_TASKS_FOUND_MESSAGE}</p>
                )}
            </div>
        </div>
    );
};
