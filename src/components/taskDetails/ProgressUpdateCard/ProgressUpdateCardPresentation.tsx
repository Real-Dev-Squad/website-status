import React from 'react';
import { useRouter } from 'next/router';
import { FaAngleRight, FaRegClock } from 'react-icons/fa6';
import Tooltip from '@/components/common/Tooltip/Tooltip';
import styles from './progress-update-card.module.scss';
import {
    ProgressUpdateCardPresentationProps,
    ProgressUpdateDataToShow,
} from './progressUpdateCard.types';
import { DEFAULT_AVATAR, USER_MANAGEMENT_URL } from '@/constants/url';

export default function ProgressUpdateCardPresentation({
    username,
    profileImageUrl,
    titleToShow,
    dateInAgoFormat,
    tooltipString,
    dataToShowState,
    onMoreOrLessButtonClick,
    onCardClick,
    isExpanded,
}: ProgressUpdateCardPresentationProps) {
    const router = useRouter();
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
                            data-testid="progress-update-more-less-button"
                            className={
                                styles['progress-update-card__more-less-button']
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
                                    ? { top: '-2.4rem', right: '4rem' }
                                    : { top: '-25px', right: '-2rem' }
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

                        {isDevMode && (
                            <span
                                data-testid="progress-update-card-user-info-container"
                                className={
                                    styles[
                                        'progress-update-card__user-info-container'
                                    ]
                                }
                                onClick={(event) => event.stopPropagation()}
                            >
                                by
                                <a
                                    href={`${USER_MANAGEMENT_URL}?username=${username}`}
                                    className={
                                        styles[
                                            'progress-update-card__user-info-link'
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
                                        data-testid="progress-update-card-profile-picture"
                                        className={
                                            styles[
                                                'progress-update-card__profile-picture'
                                            ]
                                        }
                                    />{' '}
                                    {username}
                                </a>
                            </span>
                        )}
                        <FaAngleRight
                            data-testid="progress-update-card-angle-icon"
                            style={{
                                transform: isExpanded
                                    ? 'rotate(90deg)'
                                    : 'none',
                                transition: 'transform 1s',
                            }}
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
