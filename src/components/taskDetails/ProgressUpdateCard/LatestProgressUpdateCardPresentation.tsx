import React from 'react';
import { useRouter } from 'next/router';
import { FaRegClock } from 'react-icons/fa6';
import {
    LatestProgressUpdateCardPresentationProps,
    ProgressUpdateDataToShow,
} from './progressUpdateCard.types';
import Tooltip from '@/components/common/Tooltip/Tooltip';
import styles from './latest-progress-update-card.module.scss';
import { USER_MANAGEMENT_URL } from '@/constants/url';
import UserAvatar from '@/components/common/UserAvatar/UserAvatar';
export default function LatestProgressUpdateCardPresentation({
    dataToShowState,
    username,
    userProfileImageUrl,
    tooltipText,
    onMoreOrLessButtonClick,
    dateInAgoFormat,
}: LatestProgressUpdateCardPresentationProps) {
    const router = useRouter();
    const isDevMode = router.query.dev === 'true';
    const progressInfoMapping = dataToShowState.map(
        (datum: ProgressUpdateDataToShow) => (
            <div
                key={datum.id}
                className={
                    styles['latest-progress-update-card__info-container']
                }
            >
                <span
                    className={
                        styles['latest-progress-update-card__info-title']
                    }
                >
                    {datum.label}
                </span>
                <span
                    data-testid="info-body"
                    className={styles['latest-progress-update-card__info-body']}
                >
                    {datum.isReadMoreEnabled ? datum.body : datum.trimmedBody}

                    {datum.shouldReadMoreButtonShow && (
                        <button
                            onClick={(e) => onMoreOrLessButtonClick(e, datum)}
                            className={
                                styles[
                                    'latest-progress-update-card__more-less-button'
                                ]
                            }
                        >
                            {datum.isReadMoreEnabled ? 'Less' : 'More'}
                        </button>
                    )}
                </span>
            </div>
        )
    );
    return (
        <div className={styles['latest-progress-update-card']}>
            {progressInfoMapping}
            <div
                className={
                    styles['latest-progress-update-card__info-container']
                }
            >
                <div
                    className={
                        styles['latest-progress-update-card__date-container']
                    }
                >
                    <Tooltip
                        content={tooltipText}
                        tooltipPosition={
                            isDevMode
                                ? { bottom: '2rem', right: '-2rem' }
                                : {
                                      bottom: '1.4rem',
                                      right: '-5rem',
                                  }
                        }
                    >
                        <span className={styles['date-clock-container']}>
                            <FaRegClock />
                            <span
                                className={
                                    styles['progress-update-card__date-text']
                                }
                                data-testid="latest-progress-update-card-date"
                            >
                                {dateInAgoFormat}
                            </span>
                        </span>
                    </Tooltip>
                    {isDevMode &&
                        (username === '' ? (
                            <UserAvatar
                                userProfileImageUrl={userProfileImageUrl}
                            />
                        ) : (
                            <Tooltip
                                content={username}
                                tooltipPosition={{
                                    top: '-2.5rem',
                                    right: '-3.9rem',
                                    width: '10rem',
                                }}
                            >
                                <a
                                    href={`${USER_MANAGEMENT_URL}?username=${username}`}
                                    className={
                                        styles[
                                            'latest-progress-update-card__user-info-link'
                                        ]
                                    }
                                >
                                    <UserAvatar
                                        userProfileImageUrl={
                                            userProfileImageUrl
                                        }
                                    />
                                </a>
                            </Tooltip>
                        ))}
                </div>
            </div>
        </div>
    );
}
