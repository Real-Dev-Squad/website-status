import { FC } from 'react';

import getCurrentDate from '@/utils/getLatestDate';

import NavBar from '../navBar';
import ProgressHeader from './ProgressHeader';
import ProgressForm from './ProgressForm';
import styles from '@/components/ProgressForm/ProgressForm.module.scss';

import { questions } from '@/constants/ProgressUpdates';
import { getTotalMissedTaskProgressUpdate } from '@/utils/getTotalMissedTaskProgressUpdate';
import { useGetProgressDetailsQuery } from '@/app/services/progressesApi';
import { useGetTaskDetailsQuery } from '@/app/services/taskDetailsApi';

interface ProgressLayoutPropsType {
    taskId: string[] | undefined;
}

const ProgressLayout: FC<ProgressLayoutPropsType> = ({ taskId }) => {
    const { data: userStandupdata, isLoading: isProgressUpdateDetailsLoading } =
        useGetProgressDetailsQuery(
            {
                taskId: taskId,
            },
            { skip: taskId ? false : true }
        );

    const { data: taskDetailData, isLoading: isTaskDetailsLoading } =
        useGetTaskDetailsQuery(taskId);

    const taskStartedOn = taskDetailData?.taskData?.createdAt;
    const standupDates = userStandupdata?.data?.map((element) => element.date);

    let totalProgressMissedUpdates;

    if (!isTaskDetailsLoading && !isProgressUpdateDetailsLoading) {
        if (standupDates) {
            totalProgressMissedUpdates = getTotalMissedTaskProgressUpdate(
                standupDates[0]
            );
        } else {
            totalProgressMissedUpdates = getTotalMissedTaskProgressUpdate(
                Number(taskStartedOn) * 1000
            );
        }
    } else {
        totalProgressMissedUpdates = 0;
    }

    return (
        <>
            <NavBar />
            <div className={styles.progressUpdateContainer}>
                <ProgressHeader
                    totalMissedUpdates={totalProgressMissedUpdates}
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
