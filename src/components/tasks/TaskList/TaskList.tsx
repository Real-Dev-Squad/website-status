import { useContext, useState } from 'react';
import Card from '../card';
import task from '@/interfaces/task.type';
import beautifyTaskStatus from '@/helperFunctions/beautifyTaskStatus';
import {
    SEE_MORE,
    INITIAL_TASKS_LIMIT,
    ADD_MORE_TASKS_LIMIT,
} from '../constants';
import styles from '../card/card.module.scss';
import { useEditMode } from '@/hooks/useEditMode';
import { useUpdateTaskMutation } from '@/app/services/tasksApi';
import useUserData from '@/hooks/useUserData';

type TaskListProps = {
    tasks: task[];
    hasLimit?: boolean;
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

export default function TaskList({ tasks, hasLimit = false }: TaskListProps) {
    const initialTasksLimit = hasLimit ? INITIAL_TASKS_LIMIT : tasks.length;
    const beautifiedTasks = beautifyTaskStatus(tasks);
    const [tasksLimit, setTasksLimit] = useState<number>(initialTasksLimit);
    const filteredTasks = getFilteredTasks({
        tasks: beautifiedTasks,
        hasLimit,
        tasksLimit,
    });

    const { isEditMode } = useEditMode();
    const { isUserAuthorized } = useUserData();
    const isEditable = isUserAuthorized && isEditMode;

    const [updateCardContent] = useUpdateTaskMutation();

    function onSeeMoreTasksHandler() {
        setTasksLimit((prevLimit) => prevLimit + ADD_MORE_TASKS_LIMIT);
    }
    async function onContentChangeHandler(id: string, cardDetails: any) {
        if (!isEditable || !updateCardContent) return;
        updateCardContent({ id, task: cardDetails });
    }

    return (
        <div className={styles.taskCardsContainer}>
            {filteredTasks.map((item: task) => (
                <Card
                    content={item}
                    key={item.id}
                    shouldEdit={isEditable}
                    onContentChange={onContentChangeHandler}
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
        </div>
    );
}
