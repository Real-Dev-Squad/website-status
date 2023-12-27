import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import TaskContainer from '../taskDetails/TaskContainer';
import { ProgressDetailsData } from '@/types/standup.type';
import ProgressDetails from '../taskDetails/ProgressDetails';
import styles from '@/components/ProgressCard/ProgressCard.module.scss';
import LatestProgressUpdateCard from '../taskDetails/ProgressUpdateCard/LatestProgressUpdateCard';

type SortedProgressType = { data: ProgressDetailsData[]; order: number };

type Props = { taskProgress: ProgressDetailsData[] };

export default function ProgressCard({ taskProgress }: Props) {
    const [sortedProgress, setSortedProgress] = useState<SortedProgressType>();
    const router = useRouter();
    const isDev = router.query.dev === 'true';
    const reverseSortingOrder = () => {
        if (sortedProgress && sortedProgress.data.length) {
            const newSortedArr: ProgressDetailsData[] = [];
            for (let i = 0; i < sortedProgress.data.length; i++) {
                newSortedArr[i] =
                    sortedProgress.data[sortedProgress.data.length - i - 1];
            }

            setSortedProgress({
                data: newSortedArr,
                order: sortedProgress.order === 0 ? 1 : 0,
            });
        }
    };

    useEffect(() => {
        if (taskProgress && taskProgress.length > 0) {
            const sorted = taskProgress.slice().sort((first, second) => {
                return first.date === second.date
                    ? 0
                    : first.date > second.date
                    ? -1
                    : 1;
            });
            setSortedProgress({ data: sorted, order: 1 });
        }
    }, [taskProgress]);

    return (
        <TaskContainer
            title={
                <div data-testid="progressCard">
                    Progress Updates
                    {sortedProgress?.data?.length && (
                        <button
                            data-testid="progressCard-btn"
                            className={styles.ascButton}
                            onClick={reverseSortingOrder}
                        >
                            {sortedProgress.order === 0 ? 'Asc' : 'Dsc'}
                        </button>
                    )}
                </div>
            }
            hasImg={false}
        >
            {sortedProgress && sortedProgress.data.length ? (
                <div>
                    {sortedProgress.data.map((progress, idx) =>
                        idx === 0 ? (
                            isDev && (
                                <LatestProgressUpdateCard
                                    key={progress.id}
                                    data={progress}
                                />
                            )
                        ) : (
                            <ProgressDetails
                                key={progress.id}
                                data={progress}
                            />
                        )
                    )}
                </div>
            ) : (
                'No Progress found'
            )}
        </TaskContainer>
    );
}
