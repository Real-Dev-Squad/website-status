import { FC } from 'react';
import styles from '@/components/tasks/card/card.module.scss';
import { handleProgressTextProps } from '@/interfaces/task.type';
import { Loader } from '../Loader';

const ProgressText: FC<handleProgressTextProps> = ({
    handleProgressUpdate,
    isLoading,
}) => {
    if (isLoading) {
        return <Loader />;
    }
    return (
        <button
            className={styles.changeProgressText}
            onClick={() => handleProgressUpdate()}
        >
            UPDATE
        </button>
    );
};

export default ProgressText;
