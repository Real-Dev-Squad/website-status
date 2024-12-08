import { inputPropsTypes } from '@/types/ProgressUpdates';
import styles from '@/components/ProgressForm/ProgressForm.module.scss';
import { useRouter } from 'next/router';

const InputWithQuestions = ({
    name,
    question,
    value,
    onChange,
}: inputPropsTypes) => {
    const { query } = useRouter();
    const isDev = query.dev === 'true';
    return (
        <>
            {isDev ? (
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
            ) : (
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
                        value={value}
                        onChange={(e) =>
                            onChange({ type: name, value: e.target.value })
                        }
                        id={name}
                    />
                </div>
            )}
        </>
    );
};

export default InputWithQuestions;
