import { FC } from 'react';
import classNames from '@/components/tasks/card/card.module.scss';
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
        <div
            className={classNames.changeProgressText}
            onClick={() => handleProgressUpdate()}
        >
            UPDATE
        </div>
    );
};

export default ProgressText;
