import { FC, useEffect, useReducer, useState } from 'react';

import styles from '@/components/issues/Card.module.scss';

import { useUpdateTaskMutation } from '@/app/services/tasksApi';
import { reducerAction } from '@/types/ProgressUpdates';
import { beautifyStatus } from '../tasks/card/TaskStatusEditMode';
import { BACKEND_TASK_STATUS } from '@/constants/task-status';
import { useGetTaskDetailsQuery } from '@/app/services/taskDetailsApi';
import { toast, ToastTypes } from '@/helperFunctions/toast';
import { Loader } from '../tasks/card/Loader';
import SuggestionBox from '../tasks/SuggestionBox/SuggestionBox';
import { useGetAllUsersByUsernameQuery } from '@/app/services/usersApi';
import { GithubInfo } from '@/interfaces/suggestionBox.type';
import { userDataType } from '@/interfaces/user.type';
import { DUMMY_PROFILE } from '@/constants/display-sections';

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
    status: 'ASSIGNED',
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

const { SUCCESS, ERROR } = ToastTypes;

const ActionForm: FC<ActionFormProps> = ({ taskId }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isAssigned, setIsAssigned] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [updateTask] = useUpdateTaskMutation();
    const { data } = useGetTaskDetailsQuery(taskId);
    const { data: userData } = useGetAllUsersByUsernameQuery({
        searchString: state.assignee,
    });

    console.log(userData?.users);

    useEffect(() => {
        if (data?.taskData?.assignee) {
            setIsAssigned(true);
            dispatch({
                type: 'assignee',
                value: data.taskData.assignee,
            });
        }
    }, [data]);

    const handleAssignment = (username: string) => {
        setShowSuggestion(false);
        dispatch({ type: 'assignee', value: username });
    };

    const handleSubmit = () => {
        setIsLoading(true);
        updateTask({ task: state, id: taskId })
            .unwrap()
            .then((res) => {
                toast(SUCCESS, 'Task Assigned saved successfully');
                setIsLoading(false);
                setIsAssigned(true);
            })
            .catch((error) => {
                toast(ERROR, error.data.message);
                setIsLoading(false);
            });
    };

    const suggestedUsers: GithubInfo[] = [];

    userData?.users?.map((data: userDataType) => {
        suggestedUsers.push({
            github_id: data.username,
            profileImageUrl: data?.picture?.url
                ? data.picture.url
                : DUMMY_PROFILE,
        });
    });

    return (
        <form>
            {isLoading && <Loader />}
            <button
                className={styles.card__top__button}
                type="submit"
                disabled={isAssigned}
                onClick={(e) => {
                    e.preventDefault();
                    setShowSuggestion(false);
                    handleSubmit();
                }}
            >
                Assign Task
            </button>
            <br />
            <input
                className={styles.assign}
                type="text"
                placeholder="Assignee"
                value={state.assignee}
                onChange={(e) => {
                    setShowSuggestion(true);
                    dispatch({
                        type: 'assignee',
                        value: e.target.value,
                    });
                }}
                disabled={isAssigned}
            />
            {showSuggestion && (
                <div className={styles.suggestions_container}>
                    <SuggestionBox
                        suggestions={suggestedUsers}
                        onSelectAssignee={handleAssignment}
                    />
                </div>
            )}
            {!isAssigned && (
                <>
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
                        onChange={(e) => {
                            dispatch({ type: 'status', value: e.target.value });
                        }}
                        className={styles.assign}
                    >
                        {taskStatus.map(([name, status]) => (
                            <option key={status} value={status}>
                                {beautifyStatus(name)}
                            </option>
                        ))}
                    </select>
                </>
            )}
        </form>
    );
};

export default ActionForm;
