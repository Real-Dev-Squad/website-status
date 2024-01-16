import styles from '@/components/tasks/card/card.module.scss';

export const Loader = () => {
    return (
        <div className={styles.loadingBg}>
            <div className={styles.spinner}>
                <span className={styles.screenReaderOnly} data-testid="loader">
                    loading
                </span>
            </div>
        </div>
    );
};
