import task, {
    CardTaskDetails,
    taskStatusUpdateHandleProp,
} from '@/interfaces/task.type';
import { useState } from 'react';
import styles from '@/components/tasks/card/card.module.scss';
import { PENDING, SAVED, ERROR_STATUS } from '../constants';
import {
    useUpdateTaskMutation,
    useUpdateSelfTaskMutation,
} from '@/app/services/tasksApi';
import { StatusIndicator } from './StatusIndicator';
import TaskDropDown from '../TaskDropDown';
import {
    STATUS_UPDATE_ERROR,
    STATUS_UPDATE_SUCCESSFUL,
    TASK_STATUS_MAPING,
} from '@/constants/constants';
import { toast, ToastTypes } from '@/helperFunctions/toast';

type Props = {
    task: task;
    setEditedTaskDetails: React.Dispatch<React.SetStateAction<CardTaskDetails>>;
    isDevMode?: boolean;
    isSelfTask?: boolean;
};

// TODO: remove this after fixing the card beautify status
const beautifyStatus = (status: string, isDevMode?: boolean) => {
    let beautifiedStatus = status;
    if (beautifiedStatus === 'COMPLETED' && isDevMode) {
        beautifiedStatus = 'DONE';
    }

    return (
        TASK_STATUS_MAPING[
            beautifiedStatus as keyof typeof TASK_STATUS_MAPING
        ] || status
    );
};
const TaskStatusEditMode = ({
    task,
    setEditedTaskDetails,
    isDevMode,
    isSelfTask,
}: Props) => {
    const [saveStatus, setSaveStatus] = useState('');
    const [updateTask] = useUpdateTaskMutation();
    const [updateSelfTask] = useUpdateSelfTaskMutation();
    const { SUCCESS, ERROR } = ToastTypes;

    const onChangeUpdateTaskStatus = async ({
        newStatus,
        newProgress,
    }: taskStatusUpdateHandleProp) => {
        setSaveStatus(PENDING);
        const payload: { status: string; percentCompleted?: number } = {
            status: newStatus,
        };
        if (newProgress !== undefined) {
            payload.percentCompleted = newProgress;
        }

        try {
            if (isDevMode && isSelfTask) {
                await updateSelfTask({ id: task.id, task: payload }).unwrap();
            }
            toast(SUCCESS, STATUS_UPDATE_SUCCESSFUL);
        } catch (error) {
            const errorMessage =
                error && typeof error === 'object' && 'data' in error
                    ? (error.data as { message?: string }).message ||
                      STATUS_UPDATE_ERROR
                    : STATUS_UPDATE_ERROR;
            toast(ERROR, errorMessage);
        }

        setEditedTaskDetails((prev: CardTaskDetails) => ({
            ...prev,
            ...payload,
        }));
        const response = updateTask({
            id: task.id,
            task: payload,
        });

        response
            .unwrap()
            .then(() => {
                setSaveStatus(SAVED);
            })
            .catch(() => {
                setSaveStatus(ERROR_STATUS);
            })
            .finally(() => {
                setTimeout(() => {
                    setSaveStatus('');
                }, 3000);
            });
    };

    return (
        <div className={styles.taskSection}>
            <TaskDropDown
                isDevMode={isDevMode}
                oldStatus={task.status}
                oldProgress={task.percentCompleted}
                onChange={onChangeUpdateTaskStatus}
            />
            {!isDevMode && <StatusIndicator status={saveStatus} />}
        </div>
    );
};

export { TaskStatusEditMode, beautifyStatus };
