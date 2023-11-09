import { BACKEND_TASK_STATUS } from '@/constants/task-status';
import task from '@/interfaces/task.type';
import { useState } from 'react';
import classNames from '@/components/tasks/card/card.module.scss';
import { PENDING, SAVED, ERROR_STATUS } from '../constants';
import { useUpdateTaskMutation } from '@/app/services/tasksApi';
import { StatusIndicator } from './StatusIndicator';

type Props = {
    task: task;
    handleTaskStatusUpdate: (status: string) => void;
};

// TODO: remove this after fixing the card beautify status
const beautifyStatus = (status: string) => status.split('_').join(' ');
const taskStatus = Object.entries(BACKEND_TASK_STATUS);

const TaskStatusEditMode = ({
    task,
    handleTaskStatusUpdate: setEditedTaskDetails,
}: Props) => {
    const [saveStatus, setSaveStatus] = useState('');
    const [updateTask] = useUpdateTaskMutation();

    const onChangeUpdateTaskStatus = ({
        target: { value },
    }: React.ChangeEvent<HTMLSelectElement>) => {
        setSaveStatus(PENDING);

        setEditedTaskDetails(value);
        const response = updateTask({
            id: task.id,
            task: {
                status: value,
            },
        });

        response
            .unwrap()
            .then((result: any) => {
                setSaveStatus(SAVED);
            })
            .catch((err: { data: { message: string } }) => {
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
