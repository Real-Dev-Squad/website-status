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
import Spinner from '../reusables/Spinner';

interface ExtendedFormProps extends formProps {
    onUpdateSuccess?: () => void;
}

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

const ProgressForm = ({ questions, onUpdateSuccess }: ExtendedFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [state, dispatch] = useReducer(reducer, initialState);
    const manager = [state.progress, state.plan, state.blockers];
    const [saveProgress] = useSaveProgressMutation();
    const router = useRouter();
    const isButtonEnabled =
        state.progress && state.plan && state.blockers && !isLoading;

    const handleSubmit = async (e: MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const data = {
            type: 'task',
            taskId: router.query.id,
            completed: state.progress.trim(),
            planned: state.plan.trim(),
            blockers: state.blockers.trim(),
        };

        try {
            await saveProgress(data).unwrap();
            toast(SUCCESS, 'Task Progress saved successfully');
            if (onUpdateSuccess) {
                onUpdateSuccess();
            } else {
                router.push(`/tasks/${router.query.id}`);
            }
        } catch (error: any) {
            toast(ERROR, error.data?.message);
        } finally {
            setIsLoading(false);
        }
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
                className={styles.buttonUpdated}
                onClick={handleSubmit}
                disabled={!isButtonEnabled}
                type="submit"
                data-testid="submit-dev"
            >
                {isLoading ? <Spinner /> : 'Submit'}
            </button>
        </form>
    );
};

export default ProgressForm;
