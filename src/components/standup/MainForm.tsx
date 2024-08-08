import FormInputComponent from './FormInputComponent';
import styles from '@/components/standup/standupContainer.module.scss';

const MainForm = ({ isFormVisible }: { isFormVisible: boolean }) => {
    if (isFormVisible) {
        return <FormInputComponent />;
    } else {
        return (
            <p className={styles.formFilledMessage}>
                Your standup for the day has already been submitted, please fill
                out the form tomorrow after 6:00 a.m.
            </p>
        );
    }
};

export default MainForm;
