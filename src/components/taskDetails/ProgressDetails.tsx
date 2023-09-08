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
                {getDateFromTimestamp(data.date)}
            </li>
            {showProgressDetails && (
                <div className={classNames['container-parent']}>
                    <div
                        role="button"
                        className={classNames['container-back']}
                        onClick={closeDetails}
                    ></div>

                    <div className={classNames['container-main']}>
                        <h2>{getDateFromTimestamp(data.date)}</h2>
                        <div className={classNames['content']}>
                            <div className={classNames['content-wrapper']}>
                                <div className={classNames['content-item']}>
                                    <span>Completed:</span>
                                    <p>{data.completed}</p>
                                </div>
                                <div className={classNames['content-item']}>
                                    <span>Planned:</span>
                                    <p>{data.planned}</p>
                                </div>
                                <div className={classNames['content-item']}>
                                    <span>Blockers:</span>
                                    <p>{data.blockers}</p>
                                </div>
                            </div>
                        </div>
                        <button
                            className={classNames['container-close']}
                            onClick={closeDetails}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProgressDetails;
