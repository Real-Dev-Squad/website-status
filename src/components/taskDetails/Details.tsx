import React, { FC } from 'react';
import setColor from './taskPriorityColors';
import classNames from './task-details.module.scss';
import { GITHUB_LOGO, OPENINNEWTAB_ICON } from '@/constants/url';
type Props = {
    detailType: string;
    value: string;
};

const Details: FC<Props> = ({ detailType, value }) => {
    const isGitHubLink = detailType === 'Link';
    const openGitIssueLink = () => {
        window.open(value, '_blank');
    };
    return (
        <div>
            <span className={classNames.detailType}>{detailType}:</span>
            <span
                className={classNames.detailValue}
                style={{ color: setColor?.[value] ?? 'black' }}
            >
                {isGitHubLink && value ? (
                    <button
                        className={classNames.button}
                        aria-label="Open GitHub Issue"
                        onClick={openGitIssueLink}
                    >
                        <img
                            className={classNames.icon}
                            src={GITHUB_LOGO}
                            alt="Git Icon"
                        />{' '}
                        <img
                            className={classNames.icon}
                            src={OPENINNEWTAB_ICON}
                            alt="Open In New Tab Icon"
                        />
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
