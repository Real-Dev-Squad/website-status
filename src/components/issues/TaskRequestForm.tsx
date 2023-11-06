import { FC, MouseEvent, useReducer, useState } from 'react';
import styles from '@/components/issues/Card.module.scss';
import { reducerAction } from '@/types/ProgressUpdates';
import { Loader } from '../tasks/card/Loader';
import { getDateRelativeToToday } from '@/utils/time';
import Image from 'next/image';
import { TASK_REQUESTS_DETAILS_URL } from '@/constants/url';

type ActionFormReducer = {
    startedOn: number | string;
    endsOn: number | string;
    description: string | undefined;
};

type ActionFormProps = {
    requestId?: string;
    taskId?: string;
    createTaskRequest: (data: ActionFormReducer) => Promise<void>;
};

type TaskRequestSuccessMessage = {
    requestId: string;
};
const initialState = {
    endsOn: (getDateRelativeToToday(7, 'timestamp') as number) * 1000,
    startedOn: (getDateRelativeToToday(0, 'timestamp') as number) * 1000,
    description: undefined,
};

const reducer = (state: ActionFormReducer, action: reducerAction) => {
    switch (action.type) {
        case 'endsOn':
            return {
                ...state,
                endsOn: new Date(`${action.value}`).getTime(),
            };
        case 'startedOn':
            return {
                ...state,
                startedOn: new Date(`${action.value}`).getTime(),
            };
        case 'description':
            return {
                ...state,
                description: action.value,
            };
        default:
            return state;
    }
};

const TaskRequestSuccessMessage: FC<TaskRequestSuccessMessage> = ({
    requestId,
}) => {
    const taskRequestIdSearchParam = new URLSearchParams();
    taskRequestIdSearchParam.append('id', requestId || '');
    const dashboardTaskRequestUrl = new URL(TASK_REQUESTS_DETAILS_URL);
    dashboardTaskRequestUrl.search = taskRequestIdSearchParam.toString();

    return (
        <div className={styles.successContainer}>
            <h3 data-testid="task-request-success-header">
                Task Request successful!
            </h3>
            <Image
                data-testid="task-request-success-image"
                className={styles.successImage}
                src="/check-new.svg"
                alt="Task Request successful"
                width={128}
                height={128}
            />
            <div
                data-testid="task-request-success-link-message"
                className={styles.trackMessageContainer}
            >
                <p className={styles.trackMessage}>Track your request</p>
                <a
                    data-testid="task-request-success-link"
                    className={styles.hyperlinkOpen}
                    target="_blank"
                    href={dashboardTaskRequestUrl.toString()}
                    rel="noreferrer"
                >
                    here &gt;
                </a>
            </div>
        </div>
    );
};

const TaskRequestForm: FC<ActionFormProps> = ({
    requestId,
    createTaskRequest,
    taskId,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState, undefined);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);
        await createTaskRequest(state);
        setIsLoading(false);
    };

    return (
        <div>
            {!requestId ? (
                <form className={styles.request_form}>
                    <div className={styles.form_container}>
                        <div className={styles.inputContainer}>
                            <label
                                htmlFor="starts-on"
                                className={styles.assign_label}
                            >
                                Start date:
                            </label>
                            <input
                                name="starts-on"
                                id="starts-on"
                                className={`${styles.assign} ${styles.input_date}`}
                                type="date"
                                required
                                defaultValue={getDateRelativeToToday(
                                    0,
                                    'formattedDate'
                                )}
                                onChange={(e) =>
                                    dispatch({
                                        type: 'startedOn',
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label
                                htmlFor="ends-on"
                                className={styles.assign_label}
                            >
                                End date:
                            </label>
                            <input
                                name="ends-on"
                                id="ends-on"
                                className={` ${styles.assign} ${styles.input_date}`}
                                type="date"
                                defaultValue={getDateRelativeToToday(
                                    7,
                                    'formattedDate'
                                )}
                                required
                                onChange={(e) =>
                                    dispatch({
                                        type: 'endsOn',
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                        <div className={styles.inputContainer}>
                            <label
                                htmlFor="description"
                                className={styles.assign_label}
                            >
                                Description:
                            </label>
                            <textarea
                                name="description"
                                id="description"
                                placeholder="Why do you want this task?"
                                className={`${styles.assign} ${styles.description_box}`}
                                onChange={(e) =>
                                    dispatch({
                                        type: 'description',
                                        value: e.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    {isLoading && <Loader />}
                    <div className={styles.form_container}>
                        <button
                            className={styles.card__top__button}
                            type="submit"
                            disabled={isLoading || !!requestId || !!taskId}
                            onClick={handleSubmit}
                        >
                            Create Request
                        </button>
                    </div>
                </form>
            ) : (
                <TaskRequestSuccessMessage requestId={requestId} />
            )}
        </div>
    );
};

export default TaskRequestForm;
