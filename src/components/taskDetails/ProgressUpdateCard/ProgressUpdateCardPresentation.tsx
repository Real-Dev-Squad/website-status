import React from 'react';
import { useRouter } from 'next/router';
import { FaAngleRight, FaRegClock } from 'react-icons/fa6';
import Tooltip from '@/components/common/Tooltip/Tooltip';
import styles from './progress-update-card.module.scss';
import { USER_MANAGEMENT_URL } from '@/constants/url';
import {
    ProgressUpdateCardPresentationProps,
    ProgressUpdateDataToShow,
} from './progressUpdateCard.types';
import { UserAvatar } from '@/components/common/UserAvatar/UserAvatar';

export default function ProgressUpdateCardPresentation({
    titleToShow,
    dateInAgoFormat,
    username,
    userProfileImageUrl,
    tooltipString,
    dataToShowState,
    onMoreOrLessButtonClick,
    onCardClick,
    isExpanded,
}: ProgressUpdateCardPresentationProps) {
    const router = useRouter();
    console.log(isExpanded);
    const isDevMode = router.query.dev === 'true';
    const progressInfoMapping = dataToShowState.map(
        (datum: ProgressUpdateDataToShow) => (
            <div
                key={datum.id}
                className={styles['progress-update-card__info-container']}
            >
                <span className={styles['progress-update-card__info-title']}>
                    {datum.label}
                </span>
                <span
                    data-testid="progress-update-card-info-body"
                    className={styles['progress-update-card__info-body']}
                >
                    {datum.isReadMoreEnabled ? datum.body : datum.trimmedBody}

                    {datum.shouldReadMoreButtonShow && (
                        <button
                            onClick={(e) => onMoreOrLessButtonClick(e, datum)}
                            className={
                                styles['progress-update-card__more-less-button']
                            }
                            data-testid="progress-update-card-read-more-completed"
                        >
                            {datum.isReadMoreEnabled ? 'Less' : 'More'}
                        </button>
                    )}
                </span>
            </div>
        )
    );

    return (
        <div className={styles['progress-update-card']}>
            <div
                className={`${styles['progress-update-card__container']} ${
                    isExpanded ? styles.expand : styles.shrinked
                }`}
                data-testid="progress-update-card-container"
                onClick={onCardClick}
            >
                <div className={styles['progress-update-card__main']}>
                    <h3 className={styles['progress-update-card__title']}>
                        {titleToShow}
                    </h3>
                    <div
                        className={
                            styles['progress-update-card__details-container']
                        }
                    >
                        <Tooltip
                            tooltipPosition={
                                isDevMode
                                    ? { bottom: '2.7rem', right: '0rem' }
                                    : { bottom: '2.7rem', right: '-3rem' }
                            }
                            content={tooltipString}
                        >
                            <span
                                className={
                                    styles[
                                        'progress-update-card__date-container'
                                    ]
                                }
                                onClick={(event) => event.stopPropagation()}
                                data-testid="progress-update-card-date"
                            >
                                <FaRegClock />
                                <span
                                    className={
                                        styles[
                                            'progress-update-card__date-text'
                                        ]
                                    }
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
                                        onClick={(event) =>
                                            event.stopPropagation()
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

                        <FaAngleRight
                            data-testid="progress-update-card-angle-icon"
                            className={`${
                                styles['progress-update-card__angle-icon']
                            } ${
                                isExpanded
                                    ? styles[
                                          'progress-update-card__angle-icon--expanded'
                                      ]
                                    : ''
                            }`}
                        />
                    </div>
                </div>
                <div
                    className={`${
                        styles['progress-update-card__expand-content']
                    } ${isExpanded ? styles.show : styles.hidden}`}
                    data-testid="progress-update-card-expand-content"
                >
                    <div
                        className={
                            styles['progress-update-card__progress-updates']
                        }
                    >
                        {progressInfoMapping}
                    </div>
                </div>
            </div>
        </div>
    );
}
