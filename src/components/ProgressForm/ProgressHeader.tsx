import { useGetLatestProgressQuery } from '@/app/services/progressesApi';
import styles from '@/components/ProgressForm/ProgressForm.module.scss';
import { useRouter } from 'next/router';

function ProgressHeader() {
    const router = useRouter();
    const id = router.query.id;
    const { data: date } = useGetLatestProgressQuery(`taskId=${id}`);
    const currentDate = new Date();
    const lastUpdateDate = new Date(date as number);
    return (
        <header className={styles.header}>
            <p>
                You have{' '}
                <span className={styles.mark}>
                    {' '}
                    {currentDate.getDate() - 1 - lastUpdateDate.getDate()}{' '}
                    missed
                </span>{' '}
                Progress Updates
            </p>
            <p>Lets try to avoid missing updates</p>
        </header>
    );
}

export default ProgressHeader;
