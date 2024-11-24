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
import { DEFAULT_AVATAR } from '@/constants/url';
export default function LatestProgressUpdateCardPresentation({
    username,
    profileImageUrl,
    dataToShowState,
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
                                ? { top: '-3.8rem', right: '3rem' }
                                : { top: '-2.6rem', right: '-4rem' }
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
                    {isDevMode && (
                        <span
                            data-testid="latest-progress-update-card-user-info-container"
                            className={
                                styles[
                                    'latest-progress-update-card__user-info-container'
                                ]
                            }
                        >
                            by
                            <a
                                href={`${USER_MANAGEMENT_URL}?username=${username}`}
                                className={
                                    styles[
                                        'latest-progress-update-card__user-info-link'
                                    ]
                                }
                            >
                                <img
                                    src={
                                        profileImageUrl == ''
                                            ? DEFAULT_AVATAR
                                            : profileImageUrl
                                    }
                                    alt={'Avatar'}
                                    className={
                                        styles[
                                            'latest-progress-update-card__profile-picture'
                                        ]
                                    }
                                />
                                {username}
                            </a>
                        </span>
                    )}
                </div>
            </div>
        </div>
    );
}
