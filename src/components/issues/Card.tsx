import { FC, useState } from 'react';
import styles from '@/components/issues/Card.module.scss';
import { toast, ToastTypes } from '@/helperFunctions/toast';

import fetch from '@/helperFunctions/fetch';
import { IssueCardProps } from '@/interfaces/issueProps.type';
import { TASKS_URL } from '../../constants/url';
const { SUCCESS, ERROR } = ToastTypes;

const Card: FC<IssueCardProps> = ({ issue }) => {
    const created = new Date(issue.created_at).toDateString();
    const [taskExists, setTaskExists] = useState(issue.taskExists ?? false);
    const [isLoading, setIsLoading] = useState(false);

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
        try {
            setIsLoading(true);
            const url = TASKS_URL;
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

            const { requestPromise } = fetch({
                url,
                method: 'post',
                data,
            });
            await requestPromise;
            toast(SUCCESS, 'Added the task');
            setTaskExists(true);
            setIsLoading(false);
        } catch (error: any) {
            setIsLoading(false);
            if ('response' in error) {
                toast(ERROR, error.response.data.message);
                return;
            }
            toast(ERROR, error.message);
        }
    };

    return (
        <div className={styles.card}>
            <div className={styles.card__top}>
                <div className={styles.card__top__details}>
                    <div className={styles.card__top__details__meta_data}>
                        <h2 className={styles.card__title}>{issue.title}</h2>
                        <p>
                            Opened on {created} by {issue.user.login}
                            <br></br>
                        </p>
                        <p className="card__body">{issue.body}</p>
                        {issue.assignee
                            ? 'Assigned to ' + issue.assignee.login
                            : ''}
                        <p className={styles.card__link}>
                            Issue Link :{' '}
                            <a
                                href={issue.html_url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {issue.html_url}
                            </a>{' '}
                        </p>
                    </div>

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

                <button
                    className={styles.card__top__button}
                    disabled={taskExists || isLoading}
                    onClick={handleClick}
                >
                    Convert to task
                </button>
            </div>
        </div>
    );
};

export default Card;
