import { ProgressDetailsData } from '@/types/standup.type';
import React, { MouseEvent, useState } from 'react';
import styles from './latest-progress-update-card.module.scss';
import { FaRegClock } from 'react-icons/fa6';
import moment from 'moment';
import Tooltip from '@/components/common/Tooltip/Tooltip';

type LatestProgressUpdateCardProps = {
    data: ProgressDetailsData;
};

type ReadMoreState = {
    isReadMoreEnabled: boolean;
    enabledFor: string;
};
export default function LatestProgressUpdateCard({
    data,
}: LatestProgressUpdateCardProps) {
    const momentDate = moment(data?.date);
    const dateInAgoFormat = momentDate.fromNow();
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const fullDate = momentDate.format('DD-MM-YY');
    const time = momentDate.format('hh:mmA');
    const tooltipString = `Updated at ${fullDate}, ${time}`;
    const [readMoreState, setReadMoreState] = useState<ReadMoreState>({
        isReadMoreEnabled: false,
        enabledFor: '',
    });

    function onHoverOnDate(e: MouseEvent<HTMLElement>) {
        setIsTooltipVisible(true);
    }

    function onMouseOutOnDate(e: MouseEvent<HTMLElement>) {
        setIsTooltipVisible(false);
    }

    return (
        <div className={styles['latest-progress-update-card']}>
            <div
                className={
                    styles['latest-progress-update-card__info-container']
                }
            >
                <span
                    className={
                        styles['latest-progress-update-card__info-title']
                    }
                >
                    Completed:
                </span>
                <span
                    className={styles['latest-progress-update-card__info-body']}
                >
                    {data.completed}
                </span>
            </div>
            <div
                className={
                    styles['latest-progress-update-card__info-container']
                }
            >
                <span
                    className={
                        styles['latest-progress-update-card__info-title']
                    }
                >
                    Planned:
                </span>
                <span
                    className={styles['latest-progress-update-card__info-body']}
                >
                    {data.planned}
                </span>
            </div>
            <div
                className={
                    styles['latest-progress-update-card__info-container']
                }
            >
                <span
                    className={
                        styles['latest-progress-update-card__info-title']
                    }
                >
                    Blockers:
                </span>
                <span
                    className={styles['latest-progress-update-card__info-body']}
                >
                    {data.blockers}
                </span>
            </div>
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
                    {isTooltipVisible && <Tooltip textToShow={tooltipString} />}
                </div>
            </div>
        </div>
    );
}
