import React, { useState } from 'react';
import { BACKEND_TASK_STATUS } from '@/constants/task-status';
import { beautifyStatus } from './card/TaskStatusEditMode';
import styles from '@/components/tasks/card/card.module.scss';

import { MSG_ON_0_PROGRESS, MSG_ON_100_PROGRESS } from '@/constants/constants';
import TaskDropDownModel from './TaskDropDownModel';
import { taskStatusUpdateHandleProp } from '@/interfaces/task.type';

type Props = {
    isDevMode?: boolean;
    onChange: ({ newStatus, newProgress }: taskStatusUpdateHandleProp) => void;
    oldStatus: string;
    oldProgress: number;
};

export default function TaskDropDown({
    isDevMode,
    onChange,
    oldStatus,
    oldProgress,
}: Props) {
    const [{ newStatus, newProgress }, setStatusAndProgress] = useState({
        newStatus: oldStatus,
        newProgress: oldProgress,
    });
    const [message, setMessage] = useState('');

    if (oldStatus === BACKEND_TASK_STATUS.COMPLETED) {
        BACKEND_TASK_STATUS.DONE = BACKEND_TASK_STATUS.COMPLETED;
    }

    const taskStatus = Object.entries(BACKEND_TASK_STATUS).filter(
        ([key]) =>
            !(key === BACKEND_TASK_STATUS.COMPLETED) &&
            !(!isDevMode && key === BACKEND_TASK_STATUS.BACKLOG)
    );

    const isCurrentTaskStatusBlock = oldStatus === BACKEND_TASK_STATUS.BLOCKED;
    const isCurrentTaskStatusInProgress =
        oldStatus === BACKEND_TASK_STATUS.IN_PROGRESS;
    const shouldTaskProgressBe100 = (newStatus: string) => {
        const isNewStatusInProgress =
            newStatus === BACKEND_TASK_STATUS.IN_PROGRESS;
        const isNewTaskStatusBlock = newStatus === BACKEND_TASK_STATUS.BLOCKED;

        const isCurrProgress100 = oldProgress === 100;
        return (
            (isCurrentTaskStatusBlock || isCurrentTaskStatusInProgress) &&
            !isNewStatusInProgress &&
            !isNewTaskStatusBlock &&
            !isCurrProgress100
        );
    };
    const shouldTaskProgressBe0 = (newStatus: string) => {
        const isNewStatusInProgress =
            newStatus === BACKEND_TASK_STATUS.IN_PROGRESS;
        const isCurrProgress0 = oldProgress === 0;

        return (
            isNewStatusInProgress &&
            !isCurrentTaskStatusBlock &&
            !isCurrProgress0
        );
    };
    const resetProgressAndStatus = () => {
        setStatusAndProgress({
            newStatus: oldStatus,
            newProgress: oldProgress,
        });
        setMessage('');
    };

    const handleChange = (ev: React.ChangeEvent<HTMLSelectElement>) => {
      

        const newStatusValue = ev.target.value;

        setStatusAndProgress((prev) => ({
            ...prev,
            newStatus: newStatusValue,
           
        }));

        if (oldStatus === newStatusValue) {
            return;
        }

        onChange({ newStatus: newStatusValue });
    };

    const handleProceed = () => {
        const payload = { newStatus };
        onChange(payload);
        setMessage('');
    };

    if (isDevMode) {
        return (
            <>
                <label
                    className={styles.cardPurposeAndStatusFont}
                    data-testid="task-status-label"
                >
                    Status:
                    <select
                        className={styles.taskStatusUpdate}
                        data-testid="task-status"
                        name="status"
                        onChange={handleChange}
                        value={newStatus}
                    >
                        {taskStatus.map(([name, status]) => (
                            <option
                                data-testid={`task-status-${name}`}
                                key={status}
                                value={status}
                            >
                                {beautifyStatus(name)}
                            </option>
                        ))}
                    </select>
                </label>
            </>
        );
    }
    return (
        <>
            <label>
                Status:
                <select
                    data-testid="task-status"
                    name="status"
                    onChange={handleChange}
                    value={newStatus}
                >
                    {taskStatus.map(([name, status]) => (
                        <option
                            data-testid={`task-status-${name}`}
                            key={status}
                            value={status}
                        >
                            {beautifyStatus(name)}
                        </option>
                    ))}
                </select>
            </label>
            <TaskDropDownModel
                message={message}
                resetProgressAndStatus={resetProgressAndStatus}
                handleProceed={handleProceed}
            />
        </>
    );
}
