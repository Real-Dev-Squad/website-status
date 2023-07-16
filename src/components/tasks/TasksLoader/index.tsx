import classNames from '@/components/tasks/TasksLoader/tasksloader.module.scss';

export const TasksLoader = () => {
    return (
        <div className={classNames.loader}>
            <div className={classNames.wrapper}>
                <div className={classNames.line}></div>
                <div className={classNames.line}></div>
                <div className={classNames.line}></div>
                <div className={classNames.line}></div>
                <div className={classNames.line}></div>
                <div className={classNames.line}></div>
            </div>
        </div>
    );
};
