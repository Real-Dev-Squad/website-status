import moment from 'moment';
import React, { MouseEvent, memo, useState } from 'react';
import { readMoreFormatter } from '@/utils/common';
import ProgressUpdateCardPresentation from '@/components/taskDetails/ProgressUpdateCard/ProgressUpdateCardPresentation';
import {
    ProgressUpdateCardProps,
    ProgressUpdateDataToShow,
} from './progressUpdateCard.types';
import { DEFAULT_AVATAR } from '@/constants/url';
export default memo(function ProgressUpdateCard({
    data,
}: ProgressUpdateCardProps) {
    const momentDate = moment(data?.createdAt);
    const dateInAgoFormat = momentDate.fromNow();
    const username = data.userData?.username ?? '';
    const userProfileImageUrl = data.userData?.picture?.url ?? DEFAULT_AVATAR;
    const charactersToShow = 70;
    const readMoreTitle = readMoreFormatter(data?.completed, charactersToShow);
    const titleToShow = readMoreTitle;
    const fullDate = momentDate.format('dddd, MMMM DD, YYYY, hh:mm A [GMT] Z');

    const tooltipString = `Updated at ${fullDate}`;
    const [isExpanded, setIsExpanded] = useState(false);

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

    const [dataToShowState, setDataToShowState] =
        useState<ProgressUpdateDataToShow[]>(dataToShow);

    function onMoreOrLessButtonClick(
        e: MouseEvent<HTMLElement>,
        clickedOnData: ProgressUpdateDataToShow
    ) {
        e.stopPropagation();
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

    function onCardClick() {
        setIsExpanded((prev) => !prev);
    }
    return (
        <ProgressUpdateCardPresentation
            dataToShowState={dataToShowState}
            titleToShow={titleToShow}
            username={username}
            userProfileImageUrl={userProfileImageUrl}
            onMoreOrLessButtonClick={onMoreOrLessButtonClick}
            dateInAgoFormat={dateInAgoFormat}
            tooltipString={tooltipString}
            isExpanded={isExpanded}
            onCardClick={onCardClick}
        />
    );
});
