import React, { FC } from 'react';
import setColor from './taskPriorityColors';
import classNames from './task-details.module.scss';
import { useRouter } from 'next/router';
import { TaskDetailsProps } from '@/interfaces/taskDetails.type';
import { GITHUB_LOGO } from '@/constants/url';

const Details: FC<TaskDetailsProps> = ({ detailType, value }) => {
    const router = useRouter();
    const { query } = router;
    const isDevModeEnabled = query.dev === 'true' ? true : false;
    const color = value ? setColor?.[value] : undefined;
    const isGitHubLink = detailType === 'Link';
    const openGitIssueLink = () => {
        window.open(value, '_blank');
    };

    return (
        <div className={classNames.detailsContainer}>
            <span className={classNames.detailType}>{detailType}:</span>
            <span
                className={classNames.detailValue}
                style={{ color: color ?? 'black' }}
            >
                {isDevModeEnabled && isGitHubLink && value ? (
                    <button
                        className={classNames.gitButton}
                        aria-label="Open GitHub Issue"
                        onClick={openGitIssueLink}
                        title={value}
                    >
                        <img
                            className={classNames.gitIcon}
                            src={GITHUB_LOGO}
                            alt="Git Icon"
                        />
                    </button>
                ) : (
                    <>{isGitHubLink ? 'N/A' : value ?? 'N/A'}</>
                )}
            </span>
        </div>
    );
};

export default Details;
