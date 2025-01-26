import styles from './taskDetailsShimmer.module.scss';

const TaskDetailsShimmer = () => (
    <>
        <div
            className={`${styles.taskCard} ${styles.titleContainer}`}
            data-testid="task-shimmer-card"
        >
            <div className={`${styles.title} ${styles.animate}`} />
        </div>
        <div className={`${styles.container}`}>
            <div className={`${styles.taskCardLeft}`}>
                <div className={`${styles.taskCard}`}>
                    <div className={`${styles.title} ${styles.animate}`} />
                    <div className={`${styles.assignee} ${styles.animate}`} />
                </div>
                <div className={`${styles.taskCard}`}>
                    <div className={`${styles.title} ${styles.animate}`} />
                    <div className={`${styles.flexContainer}`}>
                        <div
                            className={`${styles.estimated} ${styles.animate}`}
                        />
                        <div className={`${styles.status} ${styles.animate}`} />
                    </div>
                    <div className={`${styles.flexContainer}`}>
                        <div
                            className={`${styles.started} ${styles.animate}`}
                        />
                        <div
                            className={`${styles.assignee} ${styles.animate}`}
                        />
                    </div>
                    <div className={`${styles.assignee} ${styles.animate}`} />
                </div>
                <div className={`${styles.taskCard}`}>
                    <div className={`${styles.title} ${styles.animate}`} />
                    {[...Array(10)].map((_, index) => (
                        <div className={`${styles.flexContainer}`} key={index}>
                            <div
                                className={`${styles.estimated} ${styles.animate}`}
                            />
                            <div
                                className={`${styles.status} ${styles.animate}`}
                            />
                        </div>
                    ))}
                </div>
            </div>
            <div className={`${styles.taskCardRight}`}>
                {[...Array(2)].map((n: number, index) => (
                    <div className={`${styles.taskCard}`} key={index}>
                        <div className={`${styles.title} ${styles.animate}`} />
                        <div className={`${styles.flexContainer}`}>
                            <div
                                className={`${styles.estimated} ${styles.animate}`}
                            />
                            <div
                                className={`${styles.status} ${styles.animate}`}
                            />
                        </div>
                        <div className={`${styles.flexContainer}`}>
                            <div
                                className={`${styles.started} ${styles.animate}`}
                            />
                            <div
                                className={`${styles.assignee} ${styles.animate}`}
                            />
                        </div>
                        <div
                            className={`${styles.assignee} ${styles.animate}`}
                        />
                    </div>
                ))}
                <div className={`${styles.taskCard}`}>
                    <div className={`${styles.title} ${styles.animate}`} />
                    <div className={`${styles.estimated} ${styles.animate}`} />
                </div>
            </div>
        </div>
    </>
);

export default TaskDetailsShimmer;
