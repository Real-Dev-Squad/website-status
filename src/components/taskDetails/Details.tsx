import React, { FC } from 'react';
import setColor from './taskPriorityColors';
import styles from './task-details.module.scss';
import { TaskDetailsProps } from '@/interfaces/taskDetails.type';
import extractRepoName from '@/utils/extractRepoName';
import Link from 'next/link';
import { FaReceipt } from 'react-icons/fa6';
import DevFeature from '../DevFeature';
import moment from 'moment';
import Tooltip from '@/components/common/Tooltip/Tooltip';

const Details: FC<TaskDetailsProps> = ({ detailType, value, url }) => {
    const color = value ? setColor?.[value] : undefined;
    const isGitHubLink = detailType === 'Link';
    const gitHubIssueLink = isGitHubLink ? value : undefined;

    const getRelativeTime = (timestamp: string | number | undefined) => {
        return timestamp ? moment(timestamp).fromNow() : 'N/A';
    };

    const getTooltipText = (timestamp: string | number | undefined) => {
        return timestamp ? moment(timestamp).format('LLLL') : 'N/A';
    };

    const isPastDate = (timestamp: string | number | undefined) => {
        return timestamp ? moment(timestamp).isBefore(moment()) : false;
    };

    const getHumanReadableTime = (timestamp: string | number | undefined) => {
        if (!timestamp) return 'N/A';

        const now = moment();
        const futureTimestamp = moment(timestamp);

        if (futureTimestamp.isAfter(now)) {
            const yearsDiff = futureTimestamp.diff(now, 'years');
            return `in ${yearsDiff} years`;
        } else {
            const duration = moment.duration(now.diff(futureTimestamp));
            return `${duration.humanize()} ago`;
        }
    };

    const isTimeDetail =
        detailType === 'Started On' || detailType === 'Ends On';

    const isAssigneeOrReporter =
        detailType === 'Assignee' || detailType === 'Reporter';

    const isTypeOrPriorityOrStatus =
        detailType === 'Type' ||
        detailType === 'Priority' ||
        detailType === 'Status';

    const renderedValue = value ?? 'N/A';

    return (
        <div className={styles.detailsContainer}>
            <span className={styles.detailType}>
                {/* Conditional rendering for labels */}
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
                ) : isAssigneeOrReporter || isTypeOrPriorityOrStatus ? (
                    <>{renderedValue}</>
                ) : (
                    <Tooltip
                        content={isTimeDetail ? getTooltipText(value) : value}
                        tooltipPosition={{ top: '-3.6rem', right: '-4.5rem' }}
                    >
                        {/* Display the value */}
                        {isTimeDetail
                            ? getHumanReadableTime(value)
                            : renderedValue}
                    </Tooltip>
                )}
            </span>
            <span>
                {detailType === 'Ends On' && url && (
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
