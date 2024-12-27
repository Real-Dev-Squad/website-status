import { MouseEvent } from 'react';
import { ProgressDetailsData } from '@/types/standup.type';

export type ProgressUpdateCardProps = {
    data: ProgressDetailsData;
};

type MouseEventType = (event: MouseEvent<HTMLElement>) => void;

export type ProgressUpdateCardPresentationProps = {
    titleToShow: string;
    dateInAgoFormat: string;
    username: string;
    userProfileImageUrl: string;
    username: string;
    userProfileImageUrl: string;
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
    username: string;
    userProfileImageUrl: string;
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

export type ProgressUpdateCardOverviewProps = {
    titleToShow: string;
    dateInAgoFormat: string;
    username: string;
    userProfileImageUrl: string;
    tooltipString: string;
    isDevMode: boolean;
    isExpanded: boolean;
};
