import styles from '@/components/ProgressForm/ProgressForm.module.scss';
import { inputPropsTypes } from '@/types/ProgressUpdates';

const InputWithQuestions = ({
    name,
    question,
    value,
    onChange,
}: inputPropsTypes) => {
    return (
        <div className={styles.inputComponent}>
            <label className={styles.label} htmlFor={name} aria-label={name}>
                {question}
            </label>
            <textarea
                className={styles.input}
                value={value}
                onChange={(e) =>
                    onChange({ type: name, value: e.target.value })
                }
                id={name}
            />
        </div>
    );
};

export default InputWithQuestions;
