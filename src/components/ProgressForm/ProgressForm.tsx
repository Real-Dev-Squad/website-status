import InputWithQuestions from './InputWithQuestions';
import styles from '@/components/ProgressForm/ProgressForm.module.scss';
import { questions } from '../constants/ProgressUpdates';

const ProgressForm = () => {
    return (
        <form className={styles.form}>
            {questions.map((question) => (
                <InputWithQuestions
                    key={question.id}
                    name={question.name}
                    question={question.question}
                />
            ))}
            <button className={styles.buttonDisabled} type="submit">
                Submit
            </button>
        </form>
    );
};

export default ProgressForm;
