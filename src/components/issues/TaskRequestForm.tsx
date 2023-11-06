import { FC, MouseEvent, useReducer, useState } from 'react';
import styles from '@/components/issues/Card.module.scss';
import { reducerAction } from '@/types/ProgressUpdates';
import { Loader } from '../tasks/card/Loader';
import { getDateRelativeToToday } from '@/utils/time';

type ActionFormReducer = {
    startedOn: number | string;
    endsOn: number | string;
    description: string | undefined;
};

type ActionFormProps = {
    requestId?: string;
    taskId?: string;
    createTaskRequest?: (data: ActionFormReducer) => Promise<void>;
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
        if (createTaskRequest) await createTaskRequest(state);
        setIsLoading(false);
    };

    return (
        <form className={styles.request_form}>
            <div className={styles.form_container}>
                <div className={styles.inputContainer}>
                    <label htmlFor="starts-on" className={styles.assign_label}>
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
                    <label htmlFor="ends-on" className={styles.assign_label}>
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
                            dispatch({ type: 'endsOn', value: e.target.value })
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
    );
};

export default TaskRequestForm;
