import { FC } from 'react';
import moment from 'moment';
import styles from '@/components/standup/standupContainer.module.scss';
import { progressHeaderProps } from '@/types/ProgressUpdates';
import {
    MORNING559AM,
    MORNING6AM,
    STANDUP,
    STANDUP_TIME,
    DATEFORMAT,
} from '@/constants/constants';

const ProgressHeader: FC<progressHeaderProps> = ({
    totalMissedUpdates,
    updateType,
}) => {
    const currentDate = moment().format(DATEFORMAT);
    const futureDate = moment().add(1, 'day').format(DATEFORMAT);
    return (
        <div className={styles.bannerContainer}>
            <div className={styles.progressBanner}>
                <p className={styles.bannerPara}>
                    You have
                    <span className={styles.totalMissedUpdates}>
                        {totalMissedUpdates} missed
                    </span>
                    {updateType} updates
                </p>
                <p className={styles.bannerPara}>
                    Let us try to avoid having zero days
                </p>
                {updateType === STANDUP ? (
                    <div className={styles.timeContainer}>
                        <p
                            className={styles.bannerPara}
                            data-testid="standupTime"
                        >
                            {`${STANDUP_TIME} ${currentDate} ${MORNING6AM} 
                            ${futureDate} ${MORNING559AM}`}
                        </p>
                        <p
                            className={styles.bannerPara}
                            data-testid="currentStandupTime"
                        >
                            Current Standup Date - {currentDate}
                        </p>
                    </div>
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default ProgressHeader;
