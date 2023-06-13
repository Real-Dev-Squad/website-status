import { MouseEvent, useReducer, useState } from 'react';

import { toast, ToastTypes } from '@/helperFunctions/toast';
import InputWithQuestions from './InputWithQuestions';
import styles from '@/components/ProgressForm/ProgressForm.module.scss';

import {
    formProps,
    progressStates,
    reducerAction,
} from '@/types/ProgressUpdates';
import { useSaveProgressMutation } from '@/app/services/progressesApi';
import { useRouter } from 'next/router';
import { Loader } from '../tasks/card/Loader';

const initialState = {
    progress: '',
    plan: '',
    blockers: '',
};

const { SUCCESS, ERROR } = ToastTypes;

const reducer = (state: progressStates, action: reducerAction) => {
    switch (action.type) {
        case 'progress':
            return { ...state, progress: action.value };
        case 'plan':
            return { ...state, plan: action.value };
        case 'blockers':
            return { ...state, blockers: action.value };
        default:
            return state;
    }
};

const ProgressForm = ({ questions }: formProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    const manager = [state.progress, state.plan, state.blockers];
    const [saveProgress] = useSaveProgressMutation();
    const router = useRouter();

    const buttonSyle =
        state.progress && state.plan && state.blockers
            ? styles.buttonEnabled
            : styles.buttonDisabled;

    if (isLoading) {
        return <Loader></Loader>;
    }

    const handleSubmit = (e: MouseEvent) => {
        setIsLoading(true);
        e.preventDefault();
        const data = {
            type: 'task',
            taskId: router.query.id,
            completed: state.progress,
            planned: state.plan,
            blockers: state.blockers,
        };
        saveProgress(data)
            .unwrap()
            .then((res) => {
                toast(SUCCESS, 'Task Progress saved successfully');
                setIsLoading(false);
            })
            .catch((error) => {
                toast(ERROR, error.data.message);
                setIsLoading(false);
            });
    };

    return (
        <form className={styles.form}>
            {questions.map((question, index) => (
                <InputWithQuestions
                    key={question.id}
                    name={question.name}
                    question={question.question}
                    value={manager[index]}
                    onChange={dispatch}
                />
            ))}
            <button
                className={buttonSyle}
                onClick={(e) => handleSubmit(e)}
                type="submit"
            >
                Submit
            </button>
        </form>
    );
};

export default ProgressForm;
