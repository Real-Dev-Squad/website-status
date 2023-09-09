import React, { FC } from 'react';
import setColor from './taskPriorityColors';
import classNames from './task-details.module.scss';
import { useRouter } from 'next/router';
import { TaskDetailsProps } from '@/interfaces/taskDetails.type';

const Details: FC<TaskDetailsProps> = ({ detailType, value }) => {
    const router = useRouter();
    const { query } = router;
    const isDevModeEnabled = query.dev === 'true' ? true : false;
    const color = value ? setColor?.[value] : undefined;
    const isGitHubLink = detailType === 'Link';

    const gitHubIssueLink = isGitHubLink ? value : undefined;
    const issueNumberRegex = /\/issues\/(\d+)/;

    const extractIssueNumber = () => {
        const issueNumberMatch = value?.match(issueNumberRegex);
        if (issueNumberMatch && issueNumberMatch.length > 1) {
            return issueNumberMatch[1];
        }
        return null;
    };

    const issueNumber = extractIssueNumber();

    return (
        <div className={classNames.detailsContainer}>
            <span className={classNames.detailType}>{detailType}:</span>
            <span
                className={classNames.detailValue}
                style={{ color: color ?? 'black' }}
            >
                {isDevModeEnabled && isGitHubLink && value ? (
                    <a
                        className={classNames.gitLink}
                        href={gitHubIssueLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open GitHub Issue"
                        title={value}
                    >
                        {'Issue #' + issueNumber}
                    </a>
                ) : (
                    <>{isGitHubLink ? 'N/A' : value ?? 'N/A'}</>
                )}
            </span>
        </div>
    );
};

export default Details;
