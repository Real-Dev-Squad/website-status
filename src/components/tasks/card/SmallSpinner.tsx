import styles from '@/components/tasks/card/card.module.scss';

export const SmallSpinner = () => (
    <div
        className={`${styles.smallSpinner} ${styles.selfAlignEnd}`}
        data-testid="small-spinner"
    ></div>
);
