import React, { FC } from 'react';
import setColor from './taskPriorityColors';
import styles from './task-details.module.scss';
import { TaskDetailsProps } from '@/interfaces/taskDetails.type';
import extractRepoName from '@/utils/extractRepoName';
import Link from 'next/link';
import { FaReceipt } from 'react-icons/fa6';
import DevFeature from '../DevFeature';
import moment from 'moment';
import Tooltip from '@/components/common/Tooltip/Tooltip'; // Import the Tooltip component

const Details: FC<TaskDetailsProps> = ({ detailType, value, url }) => {
    const color = value ? setColor?.[value] : undefined;
    const isGitHubLink = detailType === 'Link';
    const gitHubIssueLink = isGitHubLink ? value : undefined;

    // Function to get human-readable relative time
    const getRelativeTime = (timestamp: string | number | undefined) => {
        return timestamp ? moment(timestamp).fromNow() : 'N/A';
    };

    // Function to format the date for the tooltip
    const getTooltipText = (
        timestamp: string | number | undefined,
        detailType: string
    ) => {
        if (!timestamp) return 'N/A';
        const prefix =
            detailType === 'Started On'
                ? 'Started'
                : detailType === 'Ends On'
                ? 'Ended'
                : '';
        return `${prefix}: ${moment(timestamp).format('LLLL')}`;
    };

    // Determine if the date is in the past or future
    const isPastDate = (timestamp: string | number | undefined) => {
        return timestamp ? moment(timestamp).isBefore(moment()) : false;
    };

    // Get the human-readable time for past or future dates
    const getHumanReadableTime = (timestamp: string | number | undefined) => {
        return timestamp
            ? (isPastDate(timestamp) ? 'Started ' : 'Ends ') +
                  getRelativeTime(timestamp)
            : 'N/A';
    };

    // Check if the detail type is 'Started On' or 'Ends On'
    const isTimeDetail =
        detailType === 'Started On' || detailType === 'Ends On';

    // Check if the detail type is 'Assignee' or 'Reporter'
    const isAssigneeOrReporter =
        detailType === 'Assignee' || detailType === 'Reporter';

    // Check if the detail type is 'Type', 'Priority', or 'Status'
    const isTypeOrPriorityOrStatus =
        detailType === 'Type' ||
        detailType === 'Priority' ||
        detailType === 'Status';

    return (
        <div className={styles.detailsContainer}>
            <span className={styles.detailType}>
                {/* Conditional rendering for labels */}
                {detailType}:
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
                ) : isAssigneeOrReporter ? (
                    // Don't add tooltip for Assignee and Reporter fields
                    <>{value}</>
                ) : isTypeOrPriorityOrStatus ? (
                    // Don't add tooltip for Type, Priority, and Status fields
                    <>{value}</>
                ) : (
                    <Tooltip
                        content={
                            isTimeDetail
                                ? getTooltipText(value, detailType)
                                : value
                        }
                    >
                        {/* Display the value */}
                        {isTimeDetail ? getHumanReadableTime(value) : value}
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
