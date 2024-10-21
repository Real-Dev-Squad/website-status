import React, { FC, useEffect, useState } from 'react';
import moment from 'moment';
import { FaReceipt } from 'react-icons/fa6';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Tooltip from '@/components/common/Tooltip/Tooltip';
import setColor from './taskPriorityColors';
import extractRepoName from '@/utils/extractRepoName';
import styles from './task-details.module.scss';
import {
    DetailsContentProps,
    TaskDetailsProps,
} from '@/interfaces/taskDetails.type';
import useUserData from '@/hooks/useUserData';
import { STARTED_ON, ENDS_ON } from '@/constants/constants';
import { isValidDate } from '@/utils/isValidDate';

type StringNumberOrUndefined = string | number | undefined;

const DetailsContent: FC<DetailsContentProps> = ({
    color,
    isGitHubLink,
    value,
    gitHubIssueLink,
    isTimeDetail,
    formatDate,
    tooltipActive,
    renderedValue,
    getRelativeTime,
}) => {
    const displayValue = renderedValue || value;

    if (isGitHubLink && value && gitHubIssueLink) {
        return (
            <span
                className={styles.detailValue}
                style={{ color: color ?? 'black' }}
            >
                <a
                    className={styles.gitLink}
                    href={gitHubIssueLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open GitHub Issue"
                    title={value}
                >
                    {extractRepoName(value)}
                </a>
            </span>
        );
    }

    if (isTimeDetail && value) {
        return (
            <span
                className={styles.detailValue}
                style={{ color: color ?? 'black' }}
            >
                <Tooltip
                    content={formatDate(value)}
                    tooltipPosition={{
                        top: '-3.6rem',
                        right: '-4.5rem',
                    }}
                >
                    {tooltipActive ? formatDate(value) : getRelativeTime(value)}
                </Tooltip>
            </span>
        );
    }

    return (
        <span
            className={styles.detailValue}
            style={{ color: color ?? 'black' }}
        >
            {displayValue}
        </span>
    );
};

const Details: FC<TaskDetailsProps> = (props) => {
    const { detailType, value, url, isEditing, setEditedTaskDetails } = props;
    const color = value ? setColor?.[value] : undefined;
    const isGitHubLink = detailType === 'Link';
    const gitHubIssueLink = isGitHubLink ? value : undefined;
    const [newEndOnDate, setNewEndOnDate] = useState('');
    const { isUserAuthorized } = useUserData();

    useEffect(() => {
        if (!isEditing) setNewEndOnDate('');
    }, [isEditing]);

    const handleEndsOnBlur = () => {
        const isDateValid = isValidDate(newEndOnDate);
        const endsOn = isDateValid
            ? new Date(`${newEndOnDate}`).getTime() / 1000
            : null;

        if (endsOn && endsOn > 0) {
            setEditedTaskDetails?.((prev) => ({
                ...prev,
                endsOn,
            }));
        } else {
            console.error('Invalid date provided', newEndOnDate);
        }
    };

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

    const isTimeDetail = detailType === STARTED_ON || detailType === ENDS_ON;

    const formattedDetailType =
        detailType === STARTED_ON
            ? 'Started'
            : detailType === ENDS_ON
            ? 'Ended'
            : detailType;

    const renderedValue = value ?? 'N/A';
    const dateValue =
        newEndOnDate || new Date(value as string).toLocaleDateString('en-CA');

    return (
        <div className={styles.detailsContainer}>
            <span className={styles.detailType}>{formattedDetailType}:</span>
            {isEditing && isUserAuthorized ? (
                <input
                    data-testid="endsOnTaskDetails"
                    type="date"
                    name="endsOn"
                    onChange={(e) => setNewEndOnDate(e.target.value)}
                    onBlur={handleEndsOnBlur}
                    value={dateValue}
                    className={styles.inputField}
                />
            ) : (
                <DetailsContent
                    color={color}
                    isGitHubLink={isGitHubLink}
                    value={value}
                    gitHubIssueLink={gitHubIssueLink}
                    isTimeDetail={isTimeDetail}
                    formatDate={formatDate}
                    tooltipActive={tooltipActive}
                    renderedValue={renderedValue}
                    getRelativeTime={getRelativeTime}
                />
            )}
            <span>
                {detailType === ENDS_ON && url && (
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
