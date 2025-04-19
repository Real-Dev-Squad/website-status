import React, { useState } from 'react';
import { BACKEND_TASK_STATUS } from '@/constants/task-status';
import { beautifyStatus } from './card/TaskStatusEditMode';
import styles from '@/components/tasks/card/card.module.scss';
import useUserData from '@/hooks/useUserData';

import { MSG_ON_0_PROGRESS, MSG_ON_100_PROGRESS } from '@/constants/constants';
import TaskDropDownModel from './TaskDropDownModel';
import { taskStatusUpdateHandleProp } from '@/interfaces/task.type';

type Props = {
    isDevMode?: boolean;
    onChange: ({ newStatus, newProgress }: taskStatusUpdateHandleProp) => void;
    oldStatus: string;
    oldProgress: number;
    isSuperUser?: boolean; // Added prop for better testability
};

export default function TaskStatusDropdown({
    isDevMode,
    onChange,
    oldStatus,
    oldProgress,
    isSuperUser: propSuperUser, // Renamed to avoid naming conflict
}: Props) {
    const [{ newStatus, newProgress }, setStatusAndProgress] = useState({
        newStatus: oldStatus,
        newProgress: oldProgress,
    });
    const [message, setMessage] = useState('');

    // Use the hook only if in a browser environment
    let superUserFromHook = false;
    try {
        const { data } = useUserData();
        superUserFromHook = !!data?.roles?.super_user;
    } catch (e) {
        // Handle the case where the hook is not available (like in tests)
    }

    // Use prop value if provided, otherwise use the hook value
    const isSuperUser =
        propSuperUser !== undefined ? propSuperUser : superUserFromHook;

    if (oldStatus === BACKEND_TASK_STATUS.COMPLETED) {
        BACKEND_TASK_STATUS.DONE = BACKEND_TASK_STATUS.COMPLETED;
    }

    const taskStatus = Object.entries(BACKEND_TASK_STATUS).filter(
        ([key, value]) =>
            value !== BACKEND_TASK_STATUS.COMPLETED &&
            !(
                isDevMode &&
                !isSuperUser &&
                (value === BACKEND_TASK_STATUS.BACKLOG ||
                    value === BACKEND_TASK_STATUS.UN_ASSIGNED)
            )
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
        if (isDevMode && newStatusValue !== BACKEND_TASK_STATUS.BACKLOG) {
            const msg = `The progress of current task is ${oldProgress}%. `;
            if (shouldTaskProgressBe100(newStatusValue)) {
                setStatusAndProgress((prev) => ({ ...prev, newProgress: 100 }));
                setMessage(msg + MSG_ON_100_PROGRESS);
                return;
            }
            if (shouldTaskProgressBe0(newStatusValue)) {
                setStatusAndProgress((prev) => ({ ...prev, newProgress: 0 }));
                setMessage(msg + MSG_ON_0_PROGRESS);
                return;
            }
        }
        onChange({ newStatus: newStatusValue });
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
