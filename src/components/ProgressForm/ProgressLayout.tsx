import { FC } from 'react';

import getCurrentDate from '@/utils/getLatestDate';

import NavBar from '../navBar';
import ProgressHeader from './ProgressHeader';
import ProgressForm from './ProgressForm';
import styles from '@/components/ProgressForm/ProgressForm.module.scss';

import { questions } from '@/constants/ProgressUpdates';
import { getTotalMissedUpdates } from '@/utils/getTotalMissedUpdate';
import { useTaskProgressDetailsQuery } from '@/app/services/progressesApi';

import { useRouter } from 'next/router';

const ProgressLayout: FC = () => {
    const router = useRouter();

    const id =
        typeof router.query.id === 'string' ? router.query.id : undefined;

    const { data: userTaskdata } = useTaskProgressDetailsQuery(id);
    const standupDates = userTaskdata?.data?.map((element) => element.date);
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
