import { MouseEvent } from 'react';
import { ProgressDetailsData } from '@/types/standup.type';

export type ProgressUpdateCardProps = {
    data: ProgressDetailsData;
};

type MouseEventType = (event: MouseEvent<HTMLElement>) => void;

export type ProgressUpdateCardPresentationProps = {
    username: string;
    profileImageUrl: string;
    titleToShow: string;
    dateInAgoFormat: string;
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
    username: string;
    profileImageUrl: string;
    dataToShowState: ProgressUpdateDataToShow[];
    tooltipText: string;
    onMoreOrLessButtonClick: (
        e: MouseEvent<HTMLElement>,
        clickedOnData: ProgressUpdateDataToShow
    ) => void;
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
