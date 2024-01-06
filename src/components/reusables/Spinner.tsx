import styles from '@/components/reusables/reusables.module.scss';

const Spinner = () => {
    return (
        <div
            className={styles.spinner}
            aria-label="loading"
            data-testid="loading-spinner"
        ></div>
    );
};

export default Spinner;
