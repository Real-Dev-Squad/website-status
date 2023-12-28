import { ProgressDetailsData } from '@/types/standup.type';
import React, { MouseEvent, useEffect, useState } from 'react';
import styles from './latest-progress-update-card.module.scss';
import { FaRegClock } from 'react-icons/fa6';
import moment from 'moment';
import Tooltip from '@/components/common/Tooltip/Tooltip';
import { readMoreFormatter } from '@/utils/common';

type LatestProgressUpdateCardProps = {
    data: ProgressDetailsData;
};

type ProgressUpdateDataToShow = {
    id: string;
    label: string;
    body: string;
    trimmedBody: string;
    shouldReadMoreButtonShow: boolean;
    isReadMoreEnabled: boolean;
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
    const charactersToShow = 70;

    const dataToShow = [
        {
            id: `completed-${data.id}`,
            label: 'Completed:',
            body: data.completed,
            trimmedBody: readMoreFormatter(data.completed, charactersToShow),
            shouldReadMoreButtonShow: data.completed.length > charactersToShow,
            isReadMoreEnabled: false,
        },
        {
            id: `planned-${data.id}`,
            label: 'Planned:',
            body: data.planned,
            trimmedBody: readMoreFormatter(data.planned, charactersToShow),
            shouldReadMoreButtonShow: data.planned.length > charactersToShow,
            isReadMoreEnabled: false,
        },
        {
            id: `blockers-${data.id}`,
            label: 'Blockers:',
            body: data.blockers,
            trimmedBody: readMoreFormatter(data.blockers, charactersToShow),
            shouldReadMoreButtonShow: data.blockers.length > charactersToShow,
            isReadMoreEnabled: false,
        },
    ];

    const [dataToShowState, setDataToShowState] = useState(dataToShow);

    function onHoverOnDate(e: MouseEvent<HTMLElement>) {
        setIsTooltipVisible(true);
    }

    function onMouseOutOnDate(e: MouseEvent<HTMLElement>) {
        setIsTooltipVisible(false);
    }

    function onMoreOrLessButtonClick(
        e: MouseEvent<HTMLElement>,
        clickedOnData: ProgressUpdateDataToShow
    ) {
        setDataToShowState((prevState) => {
            const newPrevState = prevState.map((datum) => {
                if (datum.id === clickedOnData.id) {
                    datum.isReadMoreEnabled = !datum.isReadMoreEnabled;
                }
                return datum;
            });

            return newPrevState;
        });
    }

    const progressInfoMapping = dataToShowState.map((datum) => (
        <div
            key={datum.id}
            className={styles['latest-progress-update-card__info-container']}
        >
            <span className={styles['latest-progress-update-card__info-title']}>
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
