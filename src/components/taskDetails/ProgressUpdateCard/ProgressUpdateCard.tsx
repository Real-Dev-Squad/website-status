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
    const momentDate = moment(data?.createdAt);
    const dateInAgoFormat = momentDate.fromNow();
    const titleLength = data?.completed?.length;
    const charactersToShow = 70;
    const readMoreTitle = readMoreFormatter(data?.completed, charactersToShow);
    const [titleToShow, setTitleToShow] = useState(readMoreTitle);
    const [isTitleWrapped, setIsTitleWrapped] = useState(true);
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

    function onMoreButtonClick(e: MouseEvent<HTMLElement>) {
        e.stopPropagation();

        if (isTitleWrapped) {
            setTitleToShow(data.completed);
            setIsTitleWrapped((prevState) => !prevState);
            return;
        }

        setTitleToShow(readMoreTitle);
        setIsTitleWrapped((prevState) => !prevState);
    }
    return (
        <ProgressUpdateCardPresentation
            titleToShow={titleToShow}
            isTitleWrapped={isTitleWrapped}
            isMoreButtonVisible={isLengthMoreThanCharactersToShow}
            onMoreButtonClick={onMoreButtonClick}
            onHoverOnDate={onHoverOnDate}
            onMouseOutOnDate={onMouseOutOnDate}
            dateInAgoFormat={dateInAgoFormat}
            isTooltipVisible={isTooltipVisible}
            tooltipString={tooltipString}
            openDetails={openDetails}
        />
    );
}
