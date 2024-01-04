import { BACKEND_TASK_STATUS } from '@/constants/task-status';
import task, { CardTaskDetails } from '@/interfaces/task.type';
import { useState } from 'react';
import classNames from '@/components/tasks/card/card.module.scss';
import { PENDING, SAVED, ERROR_STATUS } from '../constants';
import { useUpdateTaskMutation } from '@/app/services/tasksApi';
import { StatusIndicator } from './StatusIndicator';

type Props = {
    task: task;
    setEditedTaskDetails: React.Dispatch<React.SetStateAction<CardTaskDetails>>;
    isDevMode: boolean;
};

// TODO: remove this after fixing the card beautify status
const beautifyStatus = (status: string) => status.split('_').join(' ');

const TaskStatusEditMode = ({
    task,
    setEditedTaskDetails,
    isDevMode,
}: Props) => {
    const taskStatus = Object.entries(BACKEND_TASK_STATUS).filter(
        ([key]) => !(isDevMode && key === 'COMPLETED')
    );
    const [saveStatus, setSaveStatus] = useState('');
    const [updateTask] = useUpdateTaskMutation();

    const onChangeUpdateTaskStatus = ({
        target: { value },
    }: React.ChangeEvent<HTMLSelectElement>) => {
        setSaveStatus(PENDING);
        setEditedTaskDetails((prev: CardTaskDetails) => ({
            ...prev,
            status: value,
        }));
        const response = updateTask({
            id: task.id,
            task: {
                status: value,
            },
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

    // TODO: remove this after fixing the card beautify status
    const defaultStatus = task.status.toUpperCase().split(' ').join('_');

    return (
        <div className={classNames.taskSection}>
            <label>
                Status:
                <select
                    name="status"
                    onChange={onChangeUpdateTaskStatus}
                    defaultValue={defaultStatus}
                >
                    {taskStatus.map(([name, status]) => (
                        <option key={status} value={status}>
                            {beautifyStatus(name)}
                        </option>
                    ))}
                </select>
            </label>
            <StatusIndicator status={saveStatus} />
        </div>
    );
};

export { TaskStatusEditMode, beautifyStatus };
