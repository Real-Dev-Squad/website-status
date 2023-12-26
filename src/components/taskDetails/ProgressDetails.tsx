import { useState, FC, MouseEvent } from 'react';
import { ProgressDetailsData } from '@/types/standup.type';
import { getDateFromTimestamp } from '@/utils/getDateFromTimestamp';
import classNames from './progress-details.module.scss';
import { useRouter } from 'next/router';
import ProgressUpdateCard from './ProgressUpdateCard/ProgressUpdateCard';

type Props = {
    data: ProgressDetailsData;
};
const ProgressDetails: FC<Props> = ({ data }) => {
    const router = useRouter();
    console.log(data, ' data');
    const [showProgressDetails, setShowProgressDetails] =
        useState<boolean>(false);

    const openDetails = (e: MouseEvent<HTMLElement>) => {
        console.log('ha bhai mai hi hu');
        setShowProgressDetails(true);
    };

    const closeDetails = () => {
        setShowProgressDetails(false);
    };

    const isDev = router.query.dev === 'true';
    return (
        <>
            {isDev ? (
                <ProgressUpdateCard data={data} openDetails={openDetails} />
            ) : (
                <li
                    onClick={openDetails}
                    className={classNames['list-item']}
                    data-testid="progress-item"
                >
                    {getDateFromTimestamp(data.date)}
                </li>
            )}
            {showProgressDetails && (
                <div className={classNames['container-parent']}>
                    <div
                        role="button"
                        className={classNames['container-back']}
                        onClick={closeDetails}
                        data-testid="modal-background"
                    ></div>

                    <div className={classNames['container-main']}>
                        <h2>{getDateFromTimestamp(data.date)}</h2>
                        <div
                            className={classNames['content']}
                            data-testid="content"
                        >
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
