import React, { FC } from 'react';
import setColor from './taskPriorityColors';
import styles from './task-details.module.scss';
import { TaskDetailsProps } from '@/interfaces/taskDetails.type';
import extractRepoName from '@/utils/extractRepoName';
import Link from 'next/link';

const Details: FC<TaskDetailsProps> = ({
    detailType,
    value,
    icon,
    icon_url,
    showIcon,
}) => {
    const color = value ? setColor?.[value] : undefined;
    const isGitHubLink = detailType === 'Link';
    const gitHubIssueLink = isGitHubLink ? value : undefined;

    return (
        <div className={styles.detailsContainer}>
            <span className={styles.detailType}>{detailType}:</span>
            <span
                className={styles.detailValue}
                style={{ color: color ?? 'black' }}
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
            <span>
                {icon && showIcon && <Link href={`${icon_url}`}>{icon}</Link>}
            </span>
        </div>
    );
};

export default Details;
