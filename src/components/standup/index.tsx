import { FC } from 'react';
import styles from '@/components/standup/standupContainer.module.scss';
import { useGetProgressDetailsQuery } from '@/app/services/progressesApi';
import { useGetUserQuery } from '@/app/services/userApi';
import FormInputComponent from './FormInputComponent';
import { getTotalMissedUpdates } from '@/utils/getTotalMissedUpdate';
import { STANDUPTIME } from '@/constants/constants';
import ProgressHeader from '../ProgressForm/ProgressHeader';
import { getCurrentDate } from '@/utils/getCurrentDate';
const StandUpContainer: FC = () => {
    const { data: user } = useGetUserQuery();
    const { data: userStandupdata } = useGetProgressDetailsQuery({
        userId: user?.id,
    });
    const standupDates = userStandupdata?.data?.map((element) => element.date);
    const totalMissedUpdates = getTotalMissedUpdates(standupDates || []);
    const currentDate = getCurrentDate(STANDUPTIME);
    return (
        <>
            <section className="container">
                <ProgressHeader
                    totalMissedUpdates={totalMissedUpdates}
                    updateType="Standup"
                />
                <div className={styles.standupContainer}>
                    <div className={styles.standupUpdateContainer}>
                        <h1 className={styles.standupTitle}>Standup Update</h1>
                        <h4 className={styles.StandupDate}>
                            Current Date - {currentDate}
                        </h4>
                        <FormInputComponent />
                    </div>
                </div>
            </section>
        </>
    );
};
export default StandUpContainer;
