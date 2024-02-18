import { MouseEvent } from 'react';
import { ProgressDetailsData } from '@/types/standup.type';

export type ProgressUpdateCardProps = {
    data: ProgressDetailsData;
};

type MouseEventType = (event: MouseEvent<HTMLElement>) => void;

export type ProgressUpdateCardPresentationProps = {
    titleToShow: string;
    onHoverOnDate: MouseEventType;
    onMouseOutOnDate: MouseEventType;
    dateInAgoFormat: string;
    isTooltipVisible: boolean;
    tooltipString: string;
    dataToShowState: ProgressUpdateDataToShow[];
    onMoreOrLessButtonClick: (
        e: MouseEvent<HTMLElement>,
        clickedOnData: ProgressUpdateDataToShow
    ) => void;
    onCardClick: MouseEventType;
    isExpanded: boolean;
};

export type LatestProgressUpdateCardPresentationProps = {
    dataToShowState: ProgressUpdateDataToShow[];
    isTooltipVisible: boolean;
    tooltipText: string;
    onMoreOrLessButtonClick: (
        e: MouseEvent<HTMLElement>,
        clickedOnData: ProgressUpdateDataToShow
    ) => void;
    onHoverOnDate: MouseEventType;
    onMouseOutOnDate: MouseEventType;
    dateInAgoFormat: string;
};

export type ProgressUpdateDataToShow = {
    id: string;
    label: string;
    body: string;
    trimmedBody: string;
    shouldReadMoreButtonShow: boolean;
    isReadMoreEnabled: boolean;
};
