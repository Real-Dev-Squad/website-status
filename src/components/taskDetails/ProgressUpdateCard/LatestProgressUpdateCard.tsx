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
    const charactersToShow = 50;
    const [readMoreState, setReadMoreState] = useState<ReadMoreState>({
        isReadMoreEnabled: false,
        enabledFor: '',
    });
    const moreOrLessText = 'More';
    function onHoverOnDate(e: MouseEvent<HTMLElement>) {
        setIsTooltipVisible(true);
    }

    function onMouseOutOnDate(e: MouseEvent<HTMLElement>) {
        setIsTooltipVisible(false);
    }
    const dummyLongString =
        'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. ';

    const dataToShow = [
        {
            id: `completed-${data.id}`,
            label: 'Completed:',
            // body: data.completed,
            // shouldReadMoreButtonShow: data.completed.length > charactersToShow,
            body: dummyLongString,
            shouldReadMoreButtonShow: dummyLongString.length > charactersToShow,
        },
        {
            id: `planned-${data.id}`,
            label: 'Planned:',
            body: data.planned,
            shouldReadMoreButtonShow: data.planned.length > charactersToShow,
        },
        {
            id: `blockers-${data.id}`,
            label: 'Blockers:',
            body: data.blockers,
            shouldReadMoreButtonShow: data.blockers.length > charactersToShow,
        },
    ];

    const progressInfoMapping = dataToShow.map((datum) => (
        <div
            key={datum.id}
            className={styles['latest-progress-update-card__info-container']}
        >
            <span className={styles['latest-progress-update-card__info-title']}>
                {datum.label}
            </span>
            <span className={styles['latest-progress-update-card__info-body']}>
                {datum.body}

                {datum.shouldReadMoreButtonShow && (
                    <button
                        className={
                            styles[
                                'latest-progress-update-card__more-less-button'
                            ]
                        }
                    >
                        {moreOrLessText}
                    </button>
                )}
            </span>
        </div>
    ));

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
                    {isTooltipVisible && <Tooltip textToShow={tooltipString} />}
                </div>
            </div>
        </div>
    );
}
