import styles from './taskCardShimmer.module.scss';

const TaskCardShimmer = () => (
    <div className={`${styles.taskCard}`} data-testid="task-shimmer-card">
        <div className={`${styles.title} ${styles.animate}`}></div>
        <div className={`${styles.flexContainer}`}>
            <div className={`${styles.estimated} ${styles.animate}`}></div>
            <div className={`${styles.status} ${styles.animate}`}></div>
        </div>
        <div className={`${styles.started} ${styles.animate}`} />
        <div className={`${styles.assignee} ${styles.animate}`} />
    </div>
);

export default TaskCardShimmer;
