import React, { FC } from 'react';
import setColor from './taskPriorityColors';
import classNames from './task-details.module.scss';
import { TaskDetailsProps } from '@/interfaces/taskDetails.type';
import { GITHUB_LOGO } from '@/constants/url';

type Props = {
    detailType: string;
    value?: string;
};

const Details: FC<Props> = ({ detailType, value }) => {
    const color = value ? setColor?.[value] : undefined;
    const isGitHubLink = detailType === 'Link';
    const openGitIssueLink = () => {
        window.open(value, '_blank');
    };
    return (
        <div>
            <span className={classNames.detailType}>{detailType}:</span>
            <span
                className={classNames.detailValue}
                style={{ color: color ?? 'black' }}
            >
                {isGitHubLink && value ? (
                    <button
                        className={classNames.button}
                        onClick={openGitIssueLink}
                    >
                        <img
                            className={classNames.icon}
                            src={GITHUB_LOGO}
                            alt="Git Icon"
                        />{' '}
                        Open Git Issue
                    </button>
                ) : (
                    <span
                        className={classNames.detailValue}
                        style={{ color: setColor?.[value] ?? 'black' }}
                    >
                        {value ?? 'N/A'}
                    </span>
                )}
            </span>
        </div>
    );
};

export default Details;
