import NavBar from '../navBar';
import InputWithQuestions from './InputWithQuestions';
import ProgressHeader from './ProgressHeader';
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

const getFormattedDate = (): string => {
    const date = new Date();
    const month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const daysInWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    return `${daysInWeek[date.getDay()]}, ${date.getDate()} ${
        month[date.getMonth()]
    } ${date.getFullYear()}`;
};

const ProgressForm = () => {
    return (
        <>
            <NavBar />
            <ProgressHeader/>
            <form className={styles.form}>
                <h1 className={styles.formHeading}>Task Updates</h1>
                <h2 className={styles.date}>on {getFormattedDate()}</h2>
                {questions.map((question) => {
                    return (
                        <InputWithQuestions
                            key={question.id}
                            name={question.name}
                            question={question.question}
                        />
                    );
                })}
                <button className={styles.buttonDisabled} type="submit">Submit</button>
            </form>
        </>
    );
};

export default ProgressForm;
