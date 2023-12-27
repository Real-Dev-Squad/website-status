import moment from 'moment';
import React, { MouseEvent, useState } from 'react';
import { readMoreFormatter } from '@/utils/common';
import { ProgressDetailsData } from '@/types/standup.type';
import ProgressUpdateCardPresentation from '@/components/taskDetails/ProgressUpdateCard/ProgressUpdateCardPresentation';

type ProgressUpdateCardProps = {
    data: ProgressDetailsData;
    openDetails: (event: MouseEvent<HTMLElement>) => void;
};

export default function ProgressUpdateCard({
    data,
    openDetails,
}: ProgressUpdateCardProps) {
    const momentDate = moment(data?.date);
    const dateInAgoFormat = momentDate.fromNow();
    const titleLength = data?.completed?.length;
    const charactersToShow = 50;
    const titleToShow = readMoreFormatter(data?.completed, charactersToShow);
    const isLengthMoreThanCharactersToShow: boolean =
        titleLength > charactersToShow;
    const [isTooltipVisible, setIsTooltipVisible] = useState(false);
    const fullDate = momentDate.format('DD-MM-YY');
    const time = momentDate.format('hh:mmA');
    const tooltipString = `Updated at ${fullDate}, ${time}`;

    function onHoverOnDate(e: MouseEvent<HTMLElement>) {
        setIsTooltipVisible(true);
    }

    function onMouseOutOnDate(e: MouseEvent<HTMLElement>) {
        setIsTooltipVisible(false);
    }

    return (
        <ProgressUpdateCardPresentation
            openDetails={openDetails}
            titleToShow={titleToShow}
            isMoreButtonVisible={isLengthMoreThanCharactersToShow}
            onHoverOnDate={onHoverOnDate}
            onMouseOutOnDate={onMouseOutOnDate}
            dateInAgoFormat={dateInAgoFormat}
            isTooltipVisible={isTooltipVisible}
            tooltipString={tooltipString}
        />
    );
}
