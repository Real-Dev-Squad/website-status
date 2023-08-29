import React, { FC } from 'react';
import setColor from './taskPriorityColors';
import classNames from './task-details.module.scss';
import { TaskDetailsProps } from '@/interfaces/taskDetails.type';
import { GITHUB_LOGO } from '@/constants/url';

const Details: FC<TaskDetailsProps> = ({ detailType, value }) => {
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
                {isGitHubLink && value ? (
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
                    <>{value ?? 'N/A'}</>
                )}
            </span>
        </div>
    );
};

export default Details;
