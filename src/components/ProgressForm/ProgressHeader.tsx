import styles from '@/components/ProgressForm/ProgressForm.module.scss';

function ProgressHeader() {
    return (
        <header className={styles.header}>
            <p>
                You have <span className={styles.mark}> 2 missed </span>{' '}
                Progress Updates
            </p>
            <p>Lets try to avoid missing updates</p>
        </header>
    );
}

export default ProgressHeader;
