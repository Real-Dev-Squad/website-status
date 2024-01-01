import React, { MouseEvent } from 'react';
import { FaRegClock } from 'react-icons/fa6';
import Tooltip from '@/components/common/Tooltip/Tooltip';
import styles from './progress-update-card.module.scss';

type ProgressUpdateCardPresentationProps = {
    openDetails: (event: MouseEvent<HTMLElement>) => void;
    titleToShow: string;
    onHoverOnDate: (event: MouseEvent<HTMLElement>) => void;
    onMouseOutOnDate: (event: MouseEvent<HTMLElement>) => void;
    dateInAgoFormat: string;
    isTooltipVisible: boolean;
    tooltipString: string;
};
export default function ProgressUpdateCardPresentation({
    openDetails,
    titleToShow,
    onHoverOnDate,
    onMouseOutOnDate,
    dateInAgoFormat,
    isTooltipVisible,
    tooltipString,
}: ProgressUpdateCardPresentationProps) {
    return (
        <div onClick={openDetails} className={styles['progress-update-card']}>
            <h3 className={styles['progress-update-card__title']}>
                {titleToShow}
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
