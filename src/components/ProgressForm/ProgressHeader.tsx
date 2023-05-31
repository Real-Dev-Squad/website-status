import { useGetLatestProgressQuery } from '@/app/services/progressesApi';
import styles from '@/components/ProgressForm/ProgressForm.module.scss';
import { useRouter } from 'next/router';

function ProgressHeader() {
    const router = useRouter();
    const id = router.query.id;
    const { data, error } = useGetLatestProgressQuery(`taskId=${id}`);
    let missedUpdates = 0;
    if (!error) {
        const currentDate = new Date();
        const lastUpdateDate = new Date(data?.date as number);
        missedUpdates = currentDate.getDate() - 1 - lastUpdateDate.getDate();
    }
    return (
        <header className={styles.header}>
            <p>
                You have{' '}
                <span className={styles.mark}> {missedUpdates} missed</span>{' '}
                Progress Updates
            </p>
            <p>Lets try to avoid missing updates</p>
        </header>
    );
}

export default ProgressHeader;
