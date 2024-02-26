import React, { FC } from 'react';
import moment from 'moment';
import Link from 'next/link';
import { FaReceipt } from 'react-icons/fa6';
import Tooltip from '@/components/common/Tooltip/Tooltip';
import { useRouter } from 'next/router';
import setColor from './taskPriorityColors';
import extractRepoName from '@/utils/extractRepoName';
import styles from './task-details.module.scss';
import { TaskDetailsProps } from '@/interfaces/taskDetails.type';

type StringNumberOrUndefined = string | number | undefined;

const Details: FC<TaskDetailsProps> = ({ detailType, value, url }) => {
    const color = value ? setColor?.[value] : undefined;
    const isGitHubLink = detailType === 'Link';
    const gitHubIssueLink = isGitHubLink ? value : undefined;
    const router = useRouter();
    const isDevMode = router.query.dev === 'true' ? true : false;

    const getRelativeTime = (timestamp: StringNumberOrUndefined): string => {
        return timestamp ? moment(timestamp).fromNow() : 'N/A';
    };

    const getTooltipText = (timestamp: StringNumberOrUndefined): string => {
        return timestamp ? moment(timestamp).format('LLLL') : 'N/A';
    };

    const isPastDate = (timestamp: StringNumberOrUndefined): boolean => {
        return timestamp ? moment(timestamp).isBefore(moment()) : false;
    };
    /**
     * Get human-readable time format from the provided timestamp.
     * @param {string | number | undefined} timestamp - The timestamp.
     * @returns {string} - The human-readable time format, for example: instead of displaying a timestamp like "2024-02-20T14:30:00", a human-readable format would present it as "February 20, 2024, 2:30 PM
     */
    const getHumanReadableTime = (
        timestamp: StringNumberOrUndefined
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

    const shouldRenderTooltip = isDevMode && isTimeDetail;

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
