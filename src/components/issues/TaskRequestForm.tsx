import { FC, MouseEvent, useReducer, useState } from 'react';
import styles from '@/components/issues/Card.module.scss';
import { reducerAction } from '@/types/ProgressUpdates';
import { Loader } from '../tasks/card/Loader';

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

const date = new Date();
const today = date.toISOString().split('T')[0];
date.setDate(date.getDate() + 7);
const sevenDaysFromToday = date.toISOString().split('T')[0];

const initialState = {
    endsOn: Date.now(),
    startedOn: Date.now(),
    description: ' ',
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
        await createTaskRequest(state);
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
                        defaultValue={today}
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
                        defaultValue={sevenDaysFromToday}
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
