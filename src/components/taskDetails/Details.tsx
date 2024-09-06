import React, { FC, useState } from 'react';
import moment from 'moment';
import { FaReceipt } from 'react-icons/fa6';
import Link from 'next/link';
import Tooltip from '@/components/common/Tooltip/Tooltip';
import setColor from './taskPriorityColors';
import extractRepoName from '@/utils/extractRepoName';
import styles from './task-details.module.scss';
import { TaskDetailsProps } from '@/interfaces/taskDetails.type';

type StringNumberOrUndefined = string | number | undefined;

const Details: FC<TaskDetailsProps> = ({ detailType, value, url }) => {
    const color = value ? setColor?.[value] : undefined;
    const isGitHubLink = detailType === 'Link';
    const gitHubIssueLink = isGitHubLink ? value : undefined;

    const getRelativeTime = (timestamp: StringNumberOrUndefined): string => {
        return timestamp ? moment(timestamp).fromNow() : 'N/A';
    };

    const formatDate = (timestamp: StringNumberOrUndefined): string => {
        if (!timestamp) return 'N/A';

        let milliseconds: number;

        if (typeof timestamp === 'string') {
            // Parse the timestamp string to Date object
            const dateObj = new Date(timestamp);

            // Check if parsing was successful
            if (!isNaN(dateObj.getTime())) {
                milliseconds = dateObj.getTime();
            } else {
                console.error('Invalid timestamp format:', timestamp);
                return 'Invalid Date';
            }
        } else {
            milliseconds = (timestamp as number) * 1000;
        }

        // Format the date as desired
        const formattedDate = moment(milliseconds).format(
            'dddd, MMM D, YYYY, h:mm A [GMT] Z'
        );

        return formattedDate;
    };

    const [tooltipActive, setTooltipActive] = useState(false);

    const toggleTooltip = () => {
        setTooltipActive((prev) => !prev);
    };

    const isTimeDetail = detailType === 'startedOn' || detailType === 'endsOn';

    const formattedDetailType =
        detailType === 'startedOn'
            ? 'Started'
            : detailType === 'endsOn'
            ? 'Ended'
            : detailType;

    const renderedValue = value ?? 'N/A';

    return (
        <div className={styles.detailsContainer}>
            <span className={styles.detailType}>{formattedDetailType}:</span>
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
                ) : isTimeDetail ? (
                    <Tooltip
                        content={formatDate(value)}
                        tooltipPosition={{ top: '-3.6rem', right: '-4.5rem' }}
                    >
                        {tooltipActive
                            ? formatDate(value)
                            : getRelativeTime(value)}
                    </Tooltip>
                ) : (
                    renderedValue
                )}
            </span>
            <span>
                {detailType === 'endsOn' && url && (
                    <Link
                        href={url}
                        target="_blank"
                        data-testid="extension-request-icon"
                    >
                        <FaReceipt color="green" />
                    </Link>
                )}
            </span>
        </div>
    );
};

export default Details;
