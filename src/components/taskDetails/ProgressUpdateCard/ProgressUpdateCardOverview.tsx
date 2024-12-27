import React from 'react';
import { FaAngleRight, FaRegClock } from 'react-icons/fa6';
import Tooltip from '@/components/common/Tooltip/Tooltip';
import styles from './progress-update-card.module.scss';
import { USER_MANAGEMENT_URL } from '@/constants/url';
import { ProgressUpdateCardOverviewProps } from './progressUpdateCard.types';
import { UserAvatar } from '@/components/common/UserAvatar/UserAvatar';

export default function ProgressUpdateCardOverview({
    titleToShow,
    dateInAgoFormat,
    username,
    userProfileImageUrl,
    tooltipString,
    isDevMode,
    isExpanded,
}: ProgressUpdateCardOverviewProps) {
    return (
        <div className={styles['progress-update-card__main']}>
            <h3 className={styles['progress-update-card__title']}>
                {titleToShow}
            </h3>
            <div className={styles['progress-update-card__details-container']}>
                <Tooltip
                    tooltipPosition={
                        isDevMode
                            ? { top: '-2.5rem', right: '0rem' }
                            : { top: '-2.7rem', right: '-3rem' }
                    }
                    content={tooltipString}
                >
                    <span
                        className={
                            styles['progress-update-card__date-container']
                        }
                        onClick={(event) => event.stopPropagation()}
                        data-testid="progress-update-card-date"
                    >
                        <FaRegClock />
                        <span
                            className={
                                styles['progress-update-card__date-text']
                            }
                        >
                            {dateInAgoFormat}
                        </span>
                    </span>
                </Tooltip>

                {isDevMode &&
                    (username === '' ? (
                        <UserAvatar userProfileImageUrl={userProfileImageUrl} />
                    ) : (
                        <Tooltip
                            tooltipPosition={{
                                top: '-2rem',
                                right: '-2rem',
                                width: '10rem',
                            }}
                            content={username}
                        >
                            <a
                                href={`${USER_MANAGEMENT_URL}?username=${username}`}
                                className={
                                    styles[
                                        'progress-update-card__user-info-link'
                                    ]
                                }
                                data-testid="progress-update-card-user-info-link"
                                onClick={(event) => event.stopPropagation()}
                            >
                                <UserAvatar
                                    userProfileImageUrl={userProfileImageUrl}
                                />
                            </a>
                        </Tooltip>
                    ))}

                <FaAngleRight
                    data-testid="progress-update-card-angle-icon"
                    className={`${styles['progress-update-card__angle-icon']} ${
                        isExpanded
                            ? styles[
                                  'progress-update-card__angle-icon--expanded'
                              ]
                            : ''
                    }`}
                />
            </div>
        </div>
    );
}
