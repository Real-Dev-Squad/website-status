import { FC } from 'react';
import styles from '@/components/standup/standupContainer.module.scss';
import { useGetProgressDetailsQuery } from '@/app/services/progressesApi';
import { useGetUserQuery } from '@/app/services/userApi';
import { getTotalMissedUpdates } from '@/utils/getTotalMissedUpdate';
import { STANDUPTIME } from '@/constants/constants';
import ProgressHeader from '../ProgressForm/ProgressHeader';
import { getCurrentDate } from '@/utils/getCurrentDate';
import moment from 'moment';
import { Loader } from '../tasks/card/Loader';
import MainForm from './MainForm';

const StandUpContainer: FC = () => {
    const { data: user } = useGetUserQuery();
    const { data: userStandupdata, isLoading } = useGetProgressDetailsQuery(
        {
            userId: user?.id,
        },
        { skip: user?.id ? false : true }
    );
    const standupDates = userStandupdata?.data?.map((element) => element.date);
    const totalMissedUpdates = getTotalMissedUpdates(standupDates || []);
    const currentDate = getCurrentDate(STANDUPTIME);
    const result = standupDates?.reduce(
        (max, current) => (current > max ? current : max),
        standupDates[0]
    );
    const getDateFromTimeStamp = result
        ? moment(result).format('DD-MM-YYYY')
        : null;
    const getCurrentDateResult = moment().format('DD-MM-YYYY');
    const currentDateResult = getCurrentDateResult.split('-')[0];
    const dateResult = getDateFromTimeStamp
        ? getDateFromTimeStamp.split('-')[0]
        : null;
    const now = moment();
    const hour = now.hours();

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
                        <h4
                            id={JSON.stringify(userStandupdata)}
                            className={styles.StandupDate}
                        >
                            Current Date - {currentDate}
                        </h4>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <MainForm
                                isFormVisible={currentDateResult !== dateResult}
                            />
                        )}
                    </div>
                </div>
            </section>
        </>
    );
};
export default StandUpContainer;
