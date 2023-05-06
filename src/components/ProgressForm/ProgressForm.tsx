import getCurrentDate from '@/utils/getLatestDate';
import InputWithQuestions from './InputWithQuestions';
import styles from '@/components/ProgressForm/ProgressForm.module.scss';
import { questions } from '../constants/ProgressUpdates';

const ProgressForm = () => {
    return (
        <form className={styles.form}>
            <h1 className={styles.formHeading}>Task Updates</h1>
            <h2 className={styles.date}>on {getCurrentDate()}</h2>
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
