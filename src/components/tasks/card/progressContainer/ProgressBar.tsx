import { FC } from 'react';
import { ProgressBarProps } from '@/interfaces/task.type';
import ProgressSlider from './ProgressSlider';
import ProgressIndicator from './ProgressIndicator';
import styles from '@/components/tasks/card/card.module.scss';

const Progressbar: FC<ProgressBarProps> = ({
    progress,
    progressValue,
    handleProgressChange,
    debounceSlider,
    startedOn,
    endsOn,
    isLoading,
}) => {
    if (progress) {
        return (
            <>
                <ProgressSlider
                    value={progressValue}
                    debounceSlider={debounceSlider}
                    handleProgressChange={handleProgressChange}
                    isLoading={isLoading}
                />
                <div className={styles.progressPercentageCompleted}>
                    {progressValue}%
                </div>
            </>
        );
    }
    return (
        <>
            <ProgressIndicator
                percentCompleted={progressValue}
                startedOn={startedOn}
                endsOn={endsOn}
            />
            <div className={styles.progressPercentageCompleted}>
                {progressValue}%
            </div>
        </>
    );
};

export default Progressbar;
