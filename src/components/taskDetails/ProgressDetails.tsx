import { ProgressDetailsData } from '@/types/standup.type';
import { FC, MouseEvent, useState } from 'react';
import ProgressUpdateCard from './ProgressUpdateCard/ProgressUpdateCard';

type Props = {
    data: ProgressDetailsData;
};
const ProgressDetails: FC<Props> = ({ data }) => {
    const [showProgressDetails, setShowProgressDetails] =
        useState<boolean>(false);

    const openDetails = (e: MouseEvent<HTMLElement>) => {
        setShowProgressDetails(true);
    };

    const closeDetails = () => {
        setShowProgressDetails(false);
    };

    return <ProgressUpdateCard data={data} openDetails={openDetails} />;
};

export default ProgressDetails;
