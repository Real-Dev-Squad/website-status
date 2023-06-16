import { FC } from 'react';
import styles from '@/components/standup/standupContainer.module.scss';
import { progressHeaderProps } from '@/types/ProgressUpdates';

const ProgressHeader: FC<progressHeaderProps> = ({
    totalMissedUpdates,
    updateType,
}) => {
    return (
        <div className={styles.standupBanner}>
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
        </div>
    );
};

export default ProgressHeader;
