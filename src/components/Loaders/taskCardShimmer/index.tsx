import styles from './taskCardShimmer.module.scss';

const TaskCardShimmer = () => (
    <div className={`${styles.taskCard}`} data-testid="task-shimmer-card">
        <div className={`${styles.title} ${styles.animate}`} />
        <div className={`${styles.title} ${styles.animate}`} />
        <div className={`${styles.title} ${styles.animate}`} />
        <div className={`${styles.title} ${styles.animate}`} />
    </div>
);

export default TaskCardShimmer;
