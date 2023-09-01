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
            </div>
        </div>
    );
};

export default ProgressHeader;
