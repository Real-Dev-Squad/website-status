import { MouseEvent } from 'react';
import { ProgressDetailsData } from '@/types/standup.type';

export type ProgressUpdateCardProps = {
    data: ProgressDetailsData;
};

export type ProgressUpdateCardPresentationProps = {
    titleToShow: string;
    onHoverOnDate: (event: MouseEvent<HTMLElement>) => void;
    onMouseOutOnDate: (event: MouseEvent<HTMLElement>) => void;
    dateInAgoFormat: string;
    isTooltipVisible: boolean;
    tooltipString: string;
    dataToShowState: ProgressUpdateDataToShow[];
    onMoreOrLessButtonClick: (
        e: MouseEvent<HTMLElement>,
        clickedOnData: ProgressUpdateDataToShow
    ) => void;
    onCardClick: (event: MouseEvent<HTMLElement>) => void;
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
    onHoverOnDate: (e: MouseEvent<HTMLElement>) => void;
    onMouseOutOnDate: (e: MouseEvent<HTMLElement>) => void;
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