import React, { MouseEvent } from 'react';
import styles from './latest-progress-update-card.module.scss';
import { FaRegClock } from 'react-icons/fa6';
import Tooltip from '@/components/common/Tooltip/Tooltip';

type LatestProgressUpdateCardPresentationProps = {
    dataToShowState: ProgressUpdateDataToShow[];
    isTooltipVisible: boolean;
    tooltipText: string;
    onMoreOrLessButtonClick: (
        e: MouseEvent<HTMLElement>,
        clickedOnData: ProgressUpdateDataToShow
    ) => void;
    onHoverOnDate: (e: MouseEvent<HTMLElement>) => void;
    onMouseOutOnDate: (e: MouseEvent<HTMLElement>) => void;
    dateInAgoFormat: string;
};
type ProgressUpdateDataToShow = {
    id: string;
    label: string;
    body: string;
    trimmedBody: string;
    shouldReadMoreButtonShow: boolean;
    isReadMoreEnabled: boolean;
};

export default function LatestProgressUpdateCardPresentation({
    dataToShowState,
    isTooltipVisible,
    tooltipText,
    onMoreOrLessButtonClick,
    onHoverOnDate,
    onMouseOutOnDate,
    dateInAgoFormat,
}: LatestProgressUpdateCardPresentationProps) {
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
                    onMouseOver={onHoverOnDate}
                    onMouseOut={onMouseOutOnDate}
                >
                    <FaRegClock />
                    <span
                        className={styles['progress-update-card__date-text']}
                        data-testid="latest-progress-update-card-date"
                    >
                        {dateInAgoFormat}
                    </span>
                    <Tooltip
                        isVisible={isTooltipVisible}
                        textToShow={tooltipText}
                    />
                </div>
            </div>
        </div>
    );
}
