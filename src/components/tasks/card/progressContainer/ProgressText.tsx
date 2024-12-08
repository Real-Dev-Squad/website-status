import { FC } from 'react';
import styles from '@/components/tasks/card/card.module.scss';
import { handleProgressTextProps } from '@/interfaces/task.type';
import { Loader } from '../Loader';
import { useRouter } from 'next/router';

const ProgressText: FC<handleProgressTextProps> = ({
    handleProgressUpdate,
    isLoading,
}) => {
    const { query } = useRouter();
    const isDev = query.dev === 'true';
    if (isLoading) {
        return <Loader />;
    }
    return (
        <>
            {isDev ? (
                <button
                    data-testid="progress-update-text-dev"
                    className={styles.changeProgressTextUpdated}
                    onClick={() => handleProgressUpdate()}
                >
                    UPDATE
                </button>
            ) : (
                <button
                    data-testid="progress-update-text"
                    className={styles.changeProgressText}
                    onClick={() => handleProgressUpdate()}
                >
                    UPDATE
                </button>
            )}
        </>
    );
};

export default ProgressText;
