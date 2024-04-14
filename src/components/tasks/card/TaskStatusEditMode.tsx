import task, {
    CardTaskDetails,
    taskStatusUpdateHandleProp,
} from '@/interfaces/task.type';
import { useState } from 'react';
import styles from '@/components/tasks/card/card.module.scss';
import { PENDING, SAVED, ERROR_STATUS } from '../constants';
import { useUpdateTaskMutation } from '@/app/services/tasksApi';
import { StatusIndicator } from './StatusIndicator';
import TaskDropDown from '../TaskDropDown';

type Props = {
    task: task;
    setEditedTaskDetails: React.Dispatch<React.SetStateAction<CardTaskDetails>>;
    isDevMode?: boolean;
};

// TODO: remove this after fixing the card beautify status
const beautifyStatus = (status: string) => status.split('_').join(' ');

const TaskStatusEditMode = ({
    task,
    setEditedTaskDetails,
    isDevMode,
}: Props) => {
    const [saveStatus, setSaveStatus] = useState('');
    const [updateTask] = useUpdateTaskMutation();

    const onChangeUpdateTaskStatus = ({
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
            <StatusIndicator status={saveStatus} />
        </div>
    );
};

export { TaskStatusEditMode, beautifyStatus };
