import { BACKEND_TASK_STATUS } from '@/constants/task-status';
import task from '@/interfaces/task.type';

type Props = {
    task: task;
    updateTask?: (changeId: string, changeObject: object) => void;
};

// TODO: remove this after fixing the card beautify status
const beautifyStatus = (status: string) => status.split('_').join(' ');

const TaskStatusEditMode = ({ task, updateTask = () => undefined }: Props) => {
    const onChangeUpdateTaskStatus = ({
        target: { value },
    }: React.ChangeEvent<HTMLSelectElement>) => {
        updateTask(task.id, {
            status: value,
        });
    };

    const taskStatus = Object.entries(BACKEND_TASK_STATUS);

    // TODO: remove this after fixing the card beautify status
    const defaultStatus = task.status.toUpperCase().split(' ').join('_');

    return (
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
    );
};

export { TaskStatusEditMode, beautifyStatus };
