import React, { FC } from 'react';
import setColor from './taskPriorityColors';
import styles from './task-details.module.scss';
import { TaskDetailsProps } from '@/interfaces/taskDetails.type';
import extractRepoName from '@/utils/extractRepoName';
import Link from 'next/link';
import { FaReceipt } from 'react-icons/fa6';
import DevFeature from '../DevFeature';

const Details: FC<TaskDetailsProps> = ({ detailType, value, url }) => {
    const color = value ? setColor?.[value] : undefined;
    const isGitHubLink = detailType === 'Link';
    const gitHubIssueLink = isGitHubLink ? value : undefined;

    const getHumanReadableDate = (timestamp: string): string => {
        const timeDiff = new Date(timestamp).getTime() - new Date().getTime();
        const days = Math.abs(Math.floor(timeDiff / (1000 * 60 * 60 * 24)));

        if (timeDiff < 0) {
            return `${days} days ago`;
        } else if (timeDiff > 0) {
            return `${days} days`;
        } else {
            return 'Today';
        }
    };

    return (
        <div className={styles.detailsContainer}>
            <span className={styles.detailType}>
                {detailType === 'Started On'
                    ? 'Started'
                    : detailType === 'Ends On'
                    ? 'Ended'
                    : detailType}
                :
            </span>
            <span
                className={styles.detailValue}
                style={{ color: color ?? 'black' }}
                title={getHumanReadableDate(value ?? '')}
            >
                {isGitHubLink && value ? (
                    <a
                        className={styles.gitLink}
                        href={gitHubIssueLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open GitHub Issue"
                        title={value}
                    >
                        {isGitHubLink ? `${extractRepoName(value)}` : value}
                    </a>
                ) : (
                    <>{isGitHubLink ? 'N/A' : value ?? 'N/A'}</>
                )}
            </span>
            <DevFeature>
                <span>
                    {detailType === 'Ends On' && url && (
                        <Link href={url} data-testid="extension-request-icon">
                            <FaReceipt color="green" />
                        </Link>
                    )}
                </span>
            </DevFeature>
        </div>
    );
};

export default Details;
