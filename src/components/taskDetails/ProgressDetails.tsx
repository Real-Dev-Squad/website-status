import { useState, FC, MouseEvent } from 'react';
import { ProgressDetailsData } from '@/types/standup.type';
import { getDateFromTimestamp } from '@/utils/getDateFromTimestamp';
import styles from './progress-details.module.scss';
import { useRouter } from 'next/router';
import ProgressUpdateCard from './ProgressUpdateCard/ProgressUpdateCard';

type Props = {
    data: ProgressDetailsData;
};
const ProgressDetails: FC<Props> = ({ data }) => {
    const router = useRouter();
    const [showProgressDetails, setShowProgressDetails] =
        useState<boolean>(false);

    const openDetails = (e: MouseEvent<HTMLElement>) => {
        setShowProgressDetails(true);
    };

    const closeDetails = () => {
        setShowProgressDetails(false);
    };

    const isDev = router.query.dev === 'true';
    return (
        <>
            {isDev ? (
                <ProgressUpdateCard data={data} />
            ) : (
                <li
                    onClick={openDetails}
                    className={styles['list-item']}
                    data-testid="progress-item"
                >
                    {getDateFromTimestamp(data.date)}
                </li>
            )}
            {showProgressDetails && (
                <div className={styles['container-parent']}>
                    <div
                        role="button"
                        className={styles['container-back']}
                        onClick={closeDetails}
                        data-testid="modal-background"
                    ></div>

                    <div className={styles['container-main']}>
                        <h2>{getDateFromTimestamp(data.date)}</h2>
                        <div
                            className={styles['content']}
                            data-testid="content"
                        >
                            <div className={styles['content-wrapper']}>
                                <div className={styles['content-item']}>
                                    <span>Completed:</span>
                                    <p>{data.completed}</p>
                                </div>
                                <div className={styles['content-item']}>
                                    <span>Planned:</span>
                                    <p>{data.planned}</p>
                                </div>
                                <div className={styles['content-item']}>
                                    <span>Blockers:</span>
                                    <p>{data.blockers}</p>
                                </div>
                            </div>
                        </div>
                        <button
                            className={styles['container-close']}
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
