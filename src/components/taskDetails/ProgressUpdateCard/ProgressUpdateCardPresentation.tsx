import React, { MouseEvent } from 'react';
import { FaRegClock } from 'react-icons/fa6';
import Tooltip from '@/components/common/Tooltip/Tooltip';
import styles from './progress-update-card.module.scss';

type ProgressUpdateCardPresentationProps = {
    titleToShow: string;
    isTitleWrapped: boolean;
    isMoreButtonVisible: boolean;
    onMoreButtonClick: (event: MouseEvent<HTMLElement>) => void;
    onHoverOnDate: (event: MouseEvent<HTMLElement>) => void;
    onMouseOutOnDate: (event: MouseEvent<HTMLElement>) => void;
    dateInAgoFormat: string;
    isTooltipVisible: boolean;
    tooltipString: string;
};
export default function ProgressUpdateCardPresentation({
    titleToShow,
    isTitleWrapped,
    isMoreButtonVisible,
    onMoreButtonClick,
    onHoverOnDate,
    onMouseOutOnDate,
    dateInAgoFormat,
    isTooltipVisible,
    tooltipString,
}: ProgressUpdateCardPresentationProps) {
    return (
        <div className={styles['progress-update-card']}>
            <h3 className={styles['progress-update-card__title']}>
                {titleToShow}
                {isMoreButtonVisible && (
                    <button
                        className={styles['progress-update-card__more-button']}
                        onClick={onMoreButtonClick}
                    >
                        {isTitleWrapped ? 'More' : 'Less'}
                    </button>
                )}
            </h3>
            <span
                className={styles['progress-update-card__date-container']}
                onMouseOver={onHoverOnDate}
                onMouseOut={onMouseOutOnDate}
            >
                <FaRegClock />
                <span
                    className={styles['progress-update-card__date-text']}
                    data-testid="progress-update-card-date"
                >
                    {dateInAgoFormat}
                </span>
                <Tooltip
                    isVisible={isTooltipVisible}
                    textToShow={tooltipString}
                />
            </span>
        </div>
    );
}
