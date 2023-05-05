import getCurrentDate from '@/utils/getLatestDate';
import InputWithQuestions from './InputWithQuestions';
import styles from '@/components/ProgressForm/ProgressForm.module.scss';

const questions = [
    {
        id: 1,
        name: 'progress',
        question: 'Task Progress after the previous update',
    },
    {
        id: 2,
        name: 'plan',
        question: 'Planned progress before the next update',
    },
    {
        id: 3,
        name: 'blockers',
        question: 'List down any blockers that you have',
    },
];

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
