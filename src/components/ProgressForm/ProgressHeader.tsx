import styles from '@/components/ProgressForm/ProgressForm.module.scss';

function ProgressHeader() {
    return (
        <>
            <header className={styles.header}>
                <div>
                <p>You have <span className={styles.mark}> 2 missed </span> Progress Updates</p>
                <p>Lets try to avoid missing updates</p>
                </div>
            </header>
        </>
    );
}

export default ProgressHeader;