import { FC } from 'react';
import moment from 'moment';
import styles from '@/components/standup/standupContainer.module.scss';
import { progressHeaderProps } from '@/types/ProgressUpdates';

const ProgressHeader: FC<progressHeaderProps> = ({
    totalMissedUpdates,
    updateType,
}) => {
    const currentDate = moment().format('MMMM DD, YYYY ');
    const futureDate = moment().add(1, 'day').format('MMMM DD, YYYY ');
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
                    Let&apos;s try to avoid having zero days
                </p>
                {updateType === 'Standup' ? (
                    <div className={styles.timeContainer}>
                        <p
                            className={styles.bannerPara}
                            data-testid="standupTime"
                        >
                            {` Standup time - ${currentDate} 6:00 am to 
                            ${futureDate} 5:59 am`}
                        </p>
                        <p
                            className={styles.bannerPara}
                            data-testid="currentStandupTime"
                        >
                            Current Standup Date - {currentDate}
                        </p>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ProgressHeader;
