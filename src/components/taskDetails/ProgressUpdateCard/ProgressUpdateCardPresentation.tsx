import React, { MouseEvent } from 'react';
import { FaAngleRight, FaRegClock } from 'react-icons/fa6';
import Tooltip from '@/components/common/Tooltip/Tooltip';
import styles from './progress-update-card.module.scss';

type ProgressUpdateCardPresentationProps = {
    titleToShow: string;
    onHoverOnDate: (event: MouseEvent<HTMLElement>) => void;
    onMouseOutOnDate: (event: MouseEvent<HTMLElement>) => void;
    dateInAgoFormat: string;
    isTooltipVisible: boolean;
    tooltipString: string;
    dataToShowState: ProgressUpdateDataToShow[];
    onMoreOrLessButtonClick: (
        e: MouseEvent<HTMLElement>,
        clickedOnData: ProgressUpdateDataToShow
    ) => void;
    onCardClick: (event: MouseEvent<HTMLElement>) => void;
    isExpanded: boolean;
};

type ProgressUpdateDataToShow = {
    id: string;
    label: string;
    body: string;
    trimmedBody: string;
    shouldReadMoreButtonShow: boolean;
    isReadMoreEnabled: boolean;
};

export default function ProgressUpdateCardPresentation({
    titleToShow,
    onHoverOnDate,
    onMouseOutOnDate,
    dateInAgoFormat,
    isTooltipVisible,
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
                    data-testid="info-body"
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
            <Tooltip
                isVisible={isTooltipVisible}
                textToShow={tooltipString}
                tooltipPosition={{ top: '-25px', right: '-2rem' }}
            />
            <div
                className={`${styles['progress-update-card__container']} ${
                    isExpanded ? styles.expand : styles.shrinked
                }`}
                onClick={onCardClick}
            >
                <div className={styles['progress-update-card__main']}>
                    <h3 className={styles['progress-update-card__title']}>
                        {titleToShow}
                    </h3>
                    <span
                        className={
                            styles['progress-update-card__date-container']
                        }
                        onMouseOver={onHoverOnDate}
                        onMouseOut={onMouseOutOnDate}
                    >
                        <FaRegClock />
                        <span
                            className={
                                styles['progress-update-card__date-text']
                            }
                            data-testid="progress-update-card-date"
                        >
                            {dateInAgoFormat}
                        </span>
                    </span>
                    <FaAngleRight
                        style={{
                            transform: isExpanded ? 'rotate(90deg)' : 'none',
                            transition: 'transform 1s',
                        }}
                    />
                </div>
                <div
                    className={`${
                        styles['progress-update-card__expand-content']
                    } ${isExpanded ? styles.show : styles.hidden}`}
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
