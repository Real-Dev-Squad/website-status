import { useState } from 'react';
import styles from '@/components/ProgressForm/ProgressForm.module.scss';
import { inputPropsTypes } from '@/types/ProgressUpdates';

const InputWithQuestions = ({ name, question }: inputPropsTypes) => {
    const [answer, setAnswer] = useState('');
    return (
        <>
            <div className={styles.inputComponent}>
                <label
                    className={styles.label}
                    htmlFor={name}
                    aria-label={name}
                >
                    {question}
                </label>
                <textarea
                    className={styles.input}
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    id={name}
                />
            </div>
        </>
    );
};

export default InputWithQuestions;
