import { useState, FC } from 'react';
import { ProgressDetailsData } from '@/types/standup.type';
import { getDateFromTimestamp } from '@/utils/getDateFromTimestamp';
import classNames from './progress-details.module.scss';

type Props = {
    data: ProgressDetailsData;
};
const ProgressDetails: FC<Props> = ({ data }) => {
    const [showProgressDetails, setShowProgressDetails] =
        useState<boolean>(false);

    const openDetails = () => {
        setShowProgressDetails(true);
    };

    const closeDetails = () => {
        setShowProgressDetails(false);
    };
    return (
        <>
            <li onClick={openDetails} className={classNames['list-item']}>
                {getDateFromTimestamp(data.date)} : {data.completed}
            </li>
            {showProgressDetails && (
                <div>
                    {data.completed} <br />
                    {data.planned} <br />
                    {data.blockers} <br />
                </div>
            )}
            {showProgressDetails && (
                <button onClick={closeDetails}>Close</button>
            )}
        </>
    );
};

export default ProgressDetails;
