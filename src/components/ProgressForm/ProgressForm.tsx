import { useReducer } from 'react';

import InputWithQuestions from './InputWithQuestions';
import styles from '@/components/ProgressForm/ProgressForm.module.scss';

import { progressStates, reducerAction } from '@/types/ProgressUpdates';

import { questions } from '@/constants/ProgressUpdates';

const initialState = {
    progress: '',
    plan: '',
    blockers: '',
};

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

const ProgressForm = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const manager = [state.progress, state.plan, state.blockers];
    const buttonSyle =
        state.progress && state.plan && state.blockers
            ? styles.buttonEnabled
            : styles.buttonDisabled;

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
                onClick={(e) => e.preventDefault()}
                type="submit"
            >
                Submit
            </button>
        </form>
    );
};

export default ProgressForm;
