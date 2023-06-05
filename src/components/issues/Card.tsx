import { FC, useState } from 'react';
import styles from '@/components/issues/Card.module.scss';
import MarkdownRenderer from '@/components/MarkdownRenderer/MarkdownRenderer';
import { toast, ToastTypes } from '@/helperFunctions/toast';

import { IssueCardProps } from '@/interfaces/issueProps.type';
import { useAddTaskMutation } from '@/app/services/tasksApi';
const { SUCCESS, ERROR } = ToastTypes;

const Card: FC<IssueCardProps> = ({ issue }) => {
    const date = new Date(issue.created_at).toDateString();
    const [taskExists, setTaskExists] = useState(issue.taskExists ?? false);
    const [addTask, { isLoading }] = useAddTaskMutation();
    const getIssueInfo = () => {
        const issueInfo: any = {
            status: issue.state,
            id: issue.id,
        };

        if (issue.assignee) {
            issueInfo.assignee = issue.assignee.login;
        }

        return issueInfo;
    };

    const handleClick = async () => {
        const data = {
            title: issue.title,
            type: 'feature',
            status: 'AVAILABLE',
            percentCompleted: 0,
            priority: 'TBD',
            github: {
                issue: getIssueInfo(),
            },
        };

        const response = addTask(data);
        response
            .unwrap()
            .then((_) => {
                toast(SUCCESS, 'Added the task');
                setTaskExists(true);
            })
            .catch((error) => {
                if ('response' in error) {
                    toast(ERROR, error.response.data.message);
                    return;
                }
                toast(ERROR, error.message);
            });
    };

    return (
        <div className={styles.card}>
            <div className={styles.card__top__details__button}>
                <h2 className={styles.card__title}>
                    <MarkdownRenderer content={issue.title} />
                </h2>
                <button
                    className={styles.card__top__button}
                    disabled={taskExists || isLoading}
                    onClick={handleClick}
                >
                    Convert to task
                </button>
            </div>
            <p className={styles.card__issue_created__by}>
                Opened on {date} by
                <a
                    href={issue.user.html_url ?? '#'}
                    target="_blank"
                    rel="noreferrer"
                >
                    {issue.user.login}
                </a>
            </p>
            <div className="card__body">
                <MarkdownRenderer
                    className={styles.card__body}
                    content={issue.body ?? 'No description provided.'}
                />
            </div>
            {issue.assignee && (
                <p className={styles.card__assignee}>
                    Assigned to:
                    <a
                        href={issue.assignee?.html_url ?? '#'}
                        target="_blank"
                        rel="noreferrer"
                    >
                        {issue.assignee?.login}
                    </a>
                </p>
            )}
            <p className={styles.card__link}>
                Issue Link :{' '}
                <a href={issue.html_url} target="_blank" rel="noreferrer">
                    {issue.html_url}
                </a>{' '}
            </p>

            <div className={styles.label__block}>
                {issue.labels.map(
                    (label: {
                        id: number | null | undefined;
                        name: string | null | undefined;
                    }) => (
                        <button className={styles.label} key={label.id}>
                            {label.name}
                        </button>
                    )
                )}
            </div>
        </div>
    );
};

export default Card;
