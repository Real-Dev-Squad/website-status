import { ProgressDetailsData } from '@/types/standup.type';
import React from 'react';
import styles from './progress-update-card.module.scss';
import moment from 'moment';
import { FaRegClock } from 'react-icons/fa';
import { readMoreFormatter } from '@/utils/common';

type Props = {
    data: ProgressDetailsData;
    openDetails: (event: React.MouseEvent<HTMLElement>) => void;
};

export default function ProgressUpdateCard({ data, openDetails }: Props) {
    const dateInAgoFormat = moment(data.date).fromNow();
    const titleLength = data.completed.length;
    const charactersToShow = 50;
    const titleToShow = readMoreFormatter(data.completed, charactersToShow);
    const isLengthMoreThanCharactersToShow = titleLength > charactersToShow;

    return (
        <div onClick={openDetails} className={styles['progress-update-card']}>
            <h3 className={styles['progress-update-card__title']}>
                {titleToShow}
                {isLengthMoreThanCharactersToShow && (
                    <button
                        className={styles['progress-update-card__more-button']}
                    >
                        More
                    </button>
                )}
            </h3>
            <span data-testid="progress-update-card-date">
                <FaRegClock />
                {dateInAgoFormat}
            </span>
        </div>
    );
}
