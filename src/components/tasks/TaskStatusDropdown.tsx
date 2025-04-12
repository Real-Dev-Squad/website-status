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
export default function TaskStatusDropdown({
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
    type TaskStatusItem = [string, string];

    interface TaskStatusSelectProps {
        newStatus: string;
        handleChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
        taskStatus: TaskStatusItem[];
        testIdPrefix?: string;
    }

    const TaskStatusSelect = ({
        newStatus,
        handleChange,
        taskStatus,
        testIdPrefix = 'task-status',
    }: TaskStatusSelectProps) => (
        <select
            className={styles.taskStatusUpdate}
            data-testid={testIdPrefix}
            name="status"
            onChange={handleChange}
            value={newStatus}
        >
            {taskStatus.map(([name, status]: TaskStatusItem) => (
                <option
                    data-testid={`${testIdPrefix}-${name}`}
                    key={status}
                    value={status}
                >
                    {beautifyStatus(name)}
                </option>
            ))}
        </select>
    );

    return (
        <>
            <label
                className={
                    isDevMode ? styles.cardPurposeAndStatusFont : undefined
                }
                data-testid={isDevMode ? 'task-status-label' : undefined}
            >
                Status:
                <TaskStatusSelect
                    newStatus={newStatus}
                    handleChange={handleChange}
                    taskStatus={taskStatus}
                />
            </label>
            <TaskDropDownModel
                message={message}
                resetProgressAndStatus={resetProgressAndStatus}
                handleProceed={handleProceed}
            />
        </>
    );
}
