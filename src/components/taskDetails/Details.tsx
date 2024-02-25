import React, { FC } from 'react';
import setColor from './taskPriorityColors';
import styles from './task-details.module.scss';
import { TaskDetailsProps } from '@/interfaces/taskDetails.type';
import extractRepoName from '@/utils/extractRepoName';
import Link from 'next/link';
import { FaReceipt } from 'react-icons/fa6';
import moment from 'moment';
import Tooltip from '@/components/common/Tooltip/Tooltip';
import { useRouter } from 'next/router';

/**
 * Functional component to render task details.
 * @param {TaskDetailsProps} props - The props for the component.
 * @returns {JSX.Element} - The JSX representation of the component.
 */
const Details: FC<TaskDetailsProps> = ({ detailType, value, url }) => {
    const color = value ? setColor?.[value] : undefined;
    const isGitHubLink = detailType === 'Link';
    const gitHubIssueLink = isGitHubLink ? value : undefined;
    const router = useRouter();
    const isDevMode = router.query.dev === 'true' ? true : false;

    /**
     * Get relative time from the provided timestamp.
     * @param {string | number | undefined} timestamp - The timestamp.
     * @returns {string} - The relative time.
     * @example
     * // Example input: '11/01/2000, 14:12:00'
     * // Example output: '21 years ago'
     */
    const getRelativeTime = (
        timestamp: string | number | undefined
    ): string => {
        return timestamp ? moment(timestamp).fromNow() : 'N/A';
    };

    /**
     * Get tooltip text from the provided timestamp.
     * @param {string | number | undefined} timestamp - The timestamp.
     * @returns {string} - The tooltip text.
     * @example
     * // Example input: '11/01/2000, 14:12:00'
     * // Example output: 'Tuesday, November 1, 2000 2:12 PM'
     */
    const getTooltipText = (timestamp: string | number | undefined): string => {
        return timestamp ? moment(timestamp).format('LLLL') : 'N/A';
    };

    /**
     * Check if the provided timestamp is in the past compared to the current time.
     * @param {string | number | undefined} timestamp - The timestamp.
     * @returns {boolean} - Returns true if the timestamp is in the past, otherwise false.
     */
    const isPastDate = (timestamp: string | number | undefined): boolean => {
        return timestamp ? moment(timestamp).isBefore(moment()) : false;
    };

    /**
     * Get human-readable time format from the provided timestamp.
     * @param {string | number | undefined} timestamp - The timestamp.
     * @returns {string} - The human-readable time format.
     */
    const getHumanReadableTime = (
        timestamp: string | number | undefined
    ): string => {
        if (!timestamp) return 'N/A';

        const now = moment();
        const futureTimestamp = moment(timestamp);

        if (futureTimestamp.isAfter(now)) {
            return `in ${moment
                .duration(futureTimestamp.diff(now))
                .humanize()}`;
        }
        return `${moment.duration(now.diff(futureTimestamp)).humanize()} ago`;
    };

    const isTimeDetail =
        detailType === 'Started On' || detailType === 'Ends On';

    const renderedValue = value ?? 'N/A';
    const formattedDetailType = isDevMode
        ? detailType === 'Started On'
            ? 'Started'
            : detailType === 'Ends On'
            ? 'Ended'
            : detailType
        : detailType;

    const shouldRenderTooltip = isTimeDetail && isDevMode;

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
                ) : shouldRenderTooltip ? (
                    <Tooltip
                        content={getTooltipText(value)}
                        tooltipPosition={{ top: '-3.6rem', right: '-4.5rem' }}
                    >
                        {getHumanReadableTime(value)}
                    </Tooltip>
                ) : (
                    renderedValue
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
