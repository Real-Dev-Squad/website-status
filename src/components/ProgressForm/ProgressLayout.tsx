import { FC } from 'react';

import getCurrentDate from '@/utils/getLatestDate';

import NavBar from '../navBar';
import ProgressHeader from './ProgressHeader';
import ProgressForm from './ProgressForm';
import styles from '@/components/ProgressForm/ProgressForm.module.scss';

import { questions } from '@/constants/ProgressUpdates';
import { getTotalMissedUpdates } from '@/utils/getTotalMissedUpdate';
import { useGetProgressDetailsQuery } from '@/app/services/progressesApi';
import { useGetUserQuery } from '@/app/services/userApi';

const ProgressLayout: FC = () => {
    const { data: user } = useGetUserQuery();
    const { data: userStandupdata } = useGetProgressDetailsQuery({
        userId: user?.id,
    });
    const standupDates = userStandupdata?.data?.map((element) => element.date);
    const totalMissedUpdates = getTotalMissedUpdates(standupDates || []);
    return (
        <>
            <NavBar />
            <div className={styles.progressUpdateContainer}>
                <ProgressHeader
                    totalMissedUpdates={totalMissedUpdates}
                    updateType="Progress"
                />
                <section className={styles.container}>
                    <h1 className={styles.formHeading}>Task Updates</h1>
                    <h2 className={styles.date}>On {getCurrentDate()}</h2>
                    <ProgressForm questions={questions} />
                </section>
            </div>
        </>
    );
};

export default ProgressLayout;
