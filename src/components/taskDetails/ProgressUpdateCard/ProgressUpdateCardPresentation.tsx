import React from 'react';
import { FaAngleRight, FaRegClock } from 'react-icons/fa6';
import Tooltip from '@/components/common/Tooltip/Tooltip';
import styles from './progress-update-card.module.scss';
import {
    ProgressUpdateCardPresentationProps,
    ProgressUpdateDataToShow,
} from './progressUpdateCard.types';
import { USER_MANAGEMENT_URL } from '@/constants/url';

export default function ProgressUpdateCardPresentation({
    username,
    titleToShow,
    dateInAgoFormat,
    tooltipString,
    dataToShowState,
    onMoreOrLessButtonClick,
    onCardClick,
    isExpanded,
}: ProgressUpdateCardPresentationProps) {
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

                    <Tooltip
                        tooltipPosition={{ top: '-25px', right: '-2rem' }}
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
                    <FaAngleRight
                        style={{
                            transform: isExpanded ? 'rotate(90deg)' : 'none',
                            transition: 'transform 1s',
                        }}
                    />
                    <span>
                        by &nbsp;
                        <a
                            href={`${USER_MANAGEMENT_URL}/?username=${username}`}
                        >
                            {username}
                        </a>
                    </span>
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
