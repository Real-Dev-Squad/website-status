import React from 'react';
import Link from 'next/link';
import { DependencyItem } from '@/interfaces/taskDetails.type';
import { UNABLE_TO_FETCH_MESSAGE } from '@/constants/messages';

interface DependencyListItemProps {
    task: DependencyItem;
    navigateToTask: (taskId: string) => void;
}

const DependencyListItem: React.FC<DependencyListItemProps> = ({
    task,
    navigateToTask,
}) => {
    const isFulfilled = task.status === 'fulfilled';
    const isRejected = task.status === 'rejected';
    const errorMessage: string | React.ReactNode =
        isRejected && task.reason.id
            ? `${UNABLE_TO_FETCH_MESSAGE} with ID ${task.reason.id}`
            : `${UNABLE_TO_FETCH_MESSAGE}`;

    if (isFulfilled) {
        return (
            <Link href={`/tasks/${task.value.id}`}>
                <span onClick={() => navigateToTask(task.value.id)}>
                    {task.value.title}
                </span>
            </Link>
        );
    } else {
        return <span>{errorMessage}</span>;
    }
};

export default DependencyListItem;
