import React, { useState } from 'react';
import { BACKEND_TASK_STATUS } from '@/constants/task-status';
import { beautifyStatus } from './card/TaskStatusEditMode';

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
            (!!isDevMode && !(key === 'BACKLOG' || key === 'DONE')) ||
            !(key === 'COMPLETED')
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
        setStatusAndProgress((prev) => ({
            ...prev,
            newStatus: ev.target.value,
        }));

        if (oldStatus === ev.target.value) {
            return;
        }
        if (isDevMode && ev.target.value !== BACKEND_TASK_STATUS.BACKLOG) {
            const msg = `The progress of current task is ${oldProgress}%. `;
            if (shouldTaskProgressBe100(ev.target.value)) {
                setStatusAndProgress((prev) => ({ ...prev, newProgress: 100 }));
                setMessage(msg + MSG_ON_100_PROGRESS);
                return;
            }
            if (shouldTaskProgressBe0(ev.target.value)) {
                setStatusAndProgress((prev) => ({ ...prev, newProgress: 0 }));
                setMessage(msg + MSG_ON_0_PROGRESS);
                return;
            }
        }
        onChange({ newStatus: ev.target.value });
    };
    const handleProceed = () => {
        const payload: { newStatus: string; newProgress?: number } = {
            newStatus,
        };
        if (newProgress != oldProgress) {
            payload.newProgress = newProgress;
        }
        onChange(payload);
        setMessage('');
    };
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
