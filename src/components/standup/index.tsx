import { FC, useEffect, useState } from 'react';
import styles from '@/components/standup/standupContainer.module.scss';
import { useGetProgressDetailsQuery } from '@/app/services/progressesApi';
import { useGetUserQuery } from '@/app/services/userApi';
import FormInputComponent from './FormInputComponent';
import { getTotalMissedUpdates } from '@/utils/getTotalMissedUpdate';
import { STANDUPTIME } from '@/constants/constants';
import ProgressHeader from '../ProgressForm/ProgressHeader';
import { getCurrentDate } from '@/utils/getCurrentDate';
import moment from 'moment';
import { Loader } from '../tasks/card/Loader';

const StandUpContainer: FC = () => {
    const [isFormVisible, setIsFormVisible] = useState<boolean>(true);

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
    const getDateFromTimeStamp = moment(result).format('DD-MM-YYYY');
    const getCurrentDateResult = moment().format('DD-MM-YYYY');
    const currentDateResult = getCurrentDateResult.split('-')[0];
    const dateResult = getDateFromTimeStamp.split('-')[0];
    const now = moment();
    const hour = now.hours();

    useEffect(() => {
        if (currentDateResult === dateResult && standupDates) {
            setIsFormVisible(false);
        } else if (hour >= 6 && currentDateResult !== dateResult) {
            setIsFormVisible(true);
        } else {
            setIsFormVisible(true);
        }
    }, [standupDates]);

    const mainForm = () => {
        if (isLoading) {
            return <Loader />;
        } else {
            if (isFormVisible) {
                return (
                    <FormInputComponent setIsFormVisible={setIsFormVisible} />
                );
            } else {
                return (
                    <p className={styles.formFilledMessage}>
                        Your standup for the day has already been submitted,
                        please fill out the form tomorrow after 6:00 a.m.
                    </p>
                );
            }
        }
    };

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
                        {mainForm()}
                    </div>
                </div>
            </section>
        </>
    );
};
export default StandUpContainer;
