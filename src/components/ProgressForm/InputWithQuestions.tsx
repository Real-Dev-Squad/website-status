import { inputPropsTypes } from '@/types/ProgressUpdates';
import styles from '@/components/ProgressForm/ProgressForm.module.scss';

const InputWithQuestions = ({
    name,
    question,
    value,
    onChange,
}: inputPropsTypes) => {
    return (
        <div className={styles.inputComponentUpdated}>
            <label
                className={styles.labelUpdated}
                htmlFor={name}
                aria-label={name}
            >
                {question}
            </label>
            <textarea
                className={styles.inputUpdated}
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
