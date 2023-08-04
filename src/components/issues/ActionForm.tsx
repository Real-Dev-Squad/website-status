import { FC, useReducer } from 'react';

import styles from '@/components/issues/Card.module.scss';

import { useUpdateTaskMutation } from '@/app/services/tasksApi';
import { reducerAction } from '@/types/ProgressUpdates';
import { beautifyStatus } from '../tasks/card/TaskStatusEditMode';
import { BACKEND_TASK_STATUS } from '@/constants/task-status';

type ActionFormReducer = {
    assignee: string;
    endsOn: number;
    status: string;
};

type ActionFormProps = {
    taskId: string;
};

const taskStatus = Object.entries(BACKEND_TASK_STATUS);

const initialState = {
    assignee: '',
    endsOn: Date.now() / 1000,
    status: 'UN ASSIGNED',
};

const reducer = (state: ActionFormReducer, action: reducerAction) => {
    switch (action.type) {
        case 'assignee':
            return { ...state, assignee: action.value };
        case 'endsOn':
            return {
                ...state,
                endsOn: new Date(`${action.value}`).getTime() / 1000,
            };
        case 'status':
            return { ...state, status: action.value };
        default:
            return state;
    }
};

const ActionForm: FC<ActionFormProps> = ({ taskId }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [updateTask] = useUpdateTaskMutation();
    return (
        <form>
            <button
                className={styles.card__top__button}
                type="submit"
                onClick={(e) => {
                    e.preventDefault();
                    updateTask({ task: state, id: taskId });
                }}
            >
                Assign Task
            </button>
            <input
                className={styles.assign}
                type="text"
                placeholder="Assignee"
                value={state.assignee}
                onChange={(e) =>
                    dispatch({ type: 'assignee', value: e.target.value })
                }
            />
            <label htmlFor="ends-on" className={styles.assign_label}>
                Ends on:
            </label>
            <input
                name="ends-on"
                id="ends-on"
                className={styles.assign}
                type="date"
                onChange={(e) =>
                    dispatch({ type: 'endsOn', value: e.target.value })
                }
            />
            <label htmlFor="status" className={styles.assign_label}>
                Status:
            </label>
            <select
                name="status"
                id="status"
                value={state.status}
                onChange={(e) =>
                    dispatch({ type: 'status', value: e.target.value })
                }
                className={styles.assign}
            >
                {taskStatus.map(([name, status]) => (
                    <option key={status} value={status}>
                        {beautifyStatus(name)}
                    </option>
                ))}
            </select>
        </form>
    );
};

export default ActionForm;
