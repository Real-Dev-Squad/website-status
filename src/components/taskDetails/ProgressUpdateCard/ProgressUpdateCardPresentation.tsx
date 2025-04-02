import React from 'react';
import styles from './progress-update-card.module.scss';
import {
    ProgressUpdateCardPresentationProps,
    ProgressUpdateDataToShow,
} from './progressUpdateCard.types';

import ProgressUpdateCardOverview from './ProgressUpdateCardOverview';

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
                            data-testid="progress-update-read-more-toggle-button"
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
                <ProgressUpdateCardOverview
                    titleToShow={titleToShow}
                    dateInAgoFormat={dateInAgoFormat}
                    username={username}
                    userProfileImageUrl={userProfileImageUrl}
                    tooltipString={tooltipString}
                    isExpanded={isExpanded}
                />
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
