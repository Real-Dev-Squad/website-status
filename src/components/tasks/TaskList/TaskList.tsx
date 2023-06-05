import { useState } from 'react';
import Card from '../Card';
import task from '@/interfaces/task.type';
import beautifyTaskStatus from '@/helperFunctions/beautifyTaskStatus';
import {
    SEE_MORE,
    INITIAL_TASKS_LIMIT,
    ADD_MORE_TASKS_LIMIT,
} from '../constants';
import styles from '../Card/card.module.scss';
import { updateTaskDetails } from '@/interfaces/taskItem.type';

type TaksListProps = {
    tasks: task[];
    isEditable?: boolean;
    hasLimit?: boolean;
    updateCardContent?: (id: string, cardDetails: task) => void;
    updateTask: (taskId: string, details: updateTaskDetails) => void;
};

type FilterTasksProps = {
    hasLimit?: boolean;
    tasksLimit: number;
    tasks: task[];
};

function getFilteredTasks({ hasLimit, tasksLimit, tasks }: FilterTasksProps) {
    if (!hasLimit) return tasks;
    return tasks.slice(0, tasksLimit);
}

export default function TaskList({
    tasks,
    updateCardContent,
    isEditable = false,
    hasLimit = false,
    updateTask,
}: TaksListProps) {
    const initialTasksLimit = hasLimit ? INITIAL_TASKS_LIMIT : tasks.length;
    const beautifiedTasks = beautifyTaskStatus(tasks);
    const [tasksLimit, setTasksLimit] = useState<number>(initialTasksLimit);
    const filteredTasks = getFilteredTasks({
        tasks: beautifiedTasks,
        hasLimit,
        tasksLimit,
    });
    function onSeeMoreTasksHandler() {
        setTasksLimit((prevLimit) => prevLimit + ADD_MORE_TASKS_LIMIT);
    }
    async function onContentChangeHandler(id: string, cardDetails: any) {
        if (!isEditable || !updateCardContent) return;
        updateCardContent(id, cardDetails);
    }

    return (
        <>
            {filteredTasks.map((item: task) => (
                <Card
                    content={item}
                    key={item.id}
                    shouldEdit={isEditable}
                    onContentChange={onContentChangeHandler}
                    updateTask={updateTask}
                />
            ))}
            {hasLimit && filteredTasks.length != beautifiedTasks.length && (
                <button
                    type="button"
                    onClick={onSeeMoreTasksHandler}
                    className={styles.seeMoreTasks}
                >
                    {SEE_MORE}
                </button>
            )}
        </>
    );
}
