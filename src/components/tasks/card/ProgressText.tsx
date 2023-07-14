import { FC } from 'react';
import classNames from '@/components/tasks/card/card.module.scss';
import { handleProgressTextProps } from '@/interfaces/task.type';

const HandleProgressText: FC<handleProgressTextProps> = ({
    progress,
    handleSaveProgressUpdate,
    handleProgressUpdate,
}) => {
    if (progress) {
        return (
            <div
                className={classNames.changeProgressText}
                onClick={() => handleSaveProgressUpdate()}
            >
                SAVE
            </div>
        );
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

export default HandleProgressText;
