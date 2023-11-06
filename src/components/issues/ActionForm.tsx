import { FC, MouseEvent, useEffect, useReducer, useState } from 'react';

import styles from '@/components/issues/Card.module.scss';
import { reducerAction } from '@/types/ProgressUpdates';
import { beautifyStatus } from '../tasks/card/TaskStatusEditMode';
import { BACKEND_TASK_STATUS } from '@/constants/task-status';
import { useGetTaskDetailsQuery } from '@/app/services/taskDetailsApi';
import { ToastTypes } from '@/helperFunctions/toast';
import { Loader } from '../tasks/card/Loader';
import Suggestions from '../tasks/SuggestionBox/Suggestions';
import { useGetAllUsersByUsernameQuery } from '@/app/services/usersApi';
import { GithubInfo } from '@/interfaces/suggestionBox.type';
import { userDataType } from '@/interfaces/user.type';
import { DUMMY_PROFILE } from '@/constants/display-sections';
import { getDateRelativeToToday } from '@/utils/time';

type ActionFormReducer = {
    assignee: string;
    endsOn: number | undefined;
    startedOn: number | undefined;
    status: string;
};

type ActionFormProps = {
    taskId: string;
    createTask: (data: ActionFormReducer) => Promise<void>;
    updateTask: (data: ActionFormReducer, taskId: string) => Promise<void>;
    taskAssignee: string | undefined;
};

const endTimeStamp: number = getDateRelativeToToday(2, 'timestamp') as number;
const initialState = {
    assignee: '',
    startedOn: undefined,
    endsOn: endTimeStamp,
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
        case 'startedOn':
            return {
                ...state,
                startedOn: new Date(`${action.value}`).getTime() / 1000,
            };
        case 'status':
            return { ...state, status: action.value };
        default:
            return state;
    }
};

const { SUCCESS, ERROR } = ToastTypes;

const ActionForm: FC<ActionFormProps> = ({
    taskId,
    taskAssignee,
    createTask,
    updateTask,
}) => {
    const taskStatus = Object.entries(BACKEND_TASK_STATUS).filter(
        ([key]) => !(key === 'COMPLETED')
    );
    const [state, dispatch] = useReducer(reducer, initialState, undefined);
    const [assignee, setAssignee] = useState(taskAssignee);
    const { data, isLoading: loading } = useGetTaskDetailsQuery(taskId);
    const [isLoading, setIsLoading] = useState(loading);
    const [endsOnDate, setEndsOnDate] = useState(
        getDateRelativeToToday(2, 'formattedDate')
    );
    const [showSuggestion, setShowSuggestion] = useState(false);
    const { data: userData } = useGetAllUsersByUsernameQuery({
        searchString: state.assignee,
    });

    useEffect(() => {
        setIsLoading(loading);
    }, [loading]);

    useEffect(() => {
        const username = taskAssignee || data?.taskData?.assignee;
        if (username) {
            setAssignee(username);
            dispatch({
                type: 'assignee',
                value: username,
            });
        }
    }, [data]);

    const handleAssignment = (username: string) => {
        setShowSuggestion(false);
        dispatch({ type: 'assignee', value: username });
    };

    const handleCreateTask = async (e: MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await createTask(state);
        setIsLoading(false);
    };

    const handleUpdateTask = async (e: MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setShowSuggestion(false);
        await updateTask(state, taskId);
        setIsLoading(false);
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
        <form className={styles.request_form}>
            <div className={styles.form_container}>
                <div className={styles.inputContainer}>
                    <div
                        className={
                            assignee
                                ? styles.suggestions_container_disabled
                                : styles.suggestions_container
                        }
                    >
                        <Suggestions
                            assigneeName={state.assignee}
                            showSuggestion={showSuggestion}
                            handleClick={handleAssignment}
                            handleAssignment={(e) => {
                                setShowSuggestion(true);
                                dispatch({
                                    type: 'assignee',
                                    value: e.target.value,
                                });
                            }}
                            setShowSuggestion={setShowSuggestion}
                        />
                    </div>
                </div>
                {!assignee && (
                    <>
                        <div className={styles.inputContainer}>
                            <label
                                htmlFor="started-on"
                                className={styles.assign_label}
                            >
                                Starts on:
                            </label>
                            <input
                                name="started-on"
                                id="started-on"
                                className={` ${styles.assign} ${styles.input_date}`}
                                type="date"
                                onChange={(e) => {
                                    dispatch({
                                        type: 'startedOn',
                                        value: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label
                                htmlFor="ends-on"
                                className={styles.assign_label}
                            >
                                Ends on:
                            </label>
                            <input
                                name="ends-on"
                                id="ends-on"
                                className={` ${styles.assign} ${styles.input_date}`}
                                value={endsOnDate}
                                type="date"
                                onChange={(e) => {
                                    setEndsOnDate(e.target.value);
                                    dispatch({
                                        type: 'endsOn',
                                        value: e.target.value,
                                    });
                                }}
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label
                                htmlFor="status"
                                className={styles.assign_label}
                            >
                                Status:
                            </label>
                            <select
                                name="status"
                                id="status"
                                value={state.status}
                                onChange={(e) => {
                                    dispatch({
                                        type: 'status',
                                        value: e.target.value,
                                    });
                                }}
                                className={` ${styles.assign} ${styles.input_select}`}
                            >
                                {taskStatus.map(([name, status]) => (
                                    <option key={status} value={status}>
                                        {beautifyStatus(name)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </>
                )}
            </div>
            <div className={styles.form_container}>
                {isLoading && <Loader />}
                {!taskId ? (
                    <button
                        className={styles.card__top__button}
                        type="submit"
                        disabled={!!taskId || !!assignee || isLoading}
                        onClick={handleCreateTask}
                    >
                        Create Task
                    </button>
                ) : (
                    <button
                        className={styles.card__top__button}
                        type="submit"
                        disabled={isLoading || !!assignee || !taskId}
                        onClick={handleUpdateTask}
                    >
                        Assign Task
                    </button>
                )}
            </div>
        </form>
    );
};

export default ActionForm;
