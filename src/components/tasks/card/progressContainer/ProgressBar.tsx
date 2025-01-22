import { FC } from 'react';
import { ProgressBarProps } from '@/interfaces/task.type';
import ProgressSlider from './ProgressSlider';
import ProgressIndicator from './ProgressIndicator';
import styles from '@/components/tasks/card/card.module.scss';

interface ExtendedProgressBarProps extends Omit<ProgressBarProps, 'progress'> {
    progress: boolean;
    readOnly?: boolean;
}

const Progressbar: FC<ExtendedProgressBarProps> = ({
    progress,
    progressValue,
    percentCompleted,
    handleProgressChange,
    debounceSlider,
    startedOn,
    endsOn,
    isLoading,
    readOnly = false,
}) => {
    // If readOnly or not in progress mode, show the indicator
    if (readOnly || !progress) {
        return (
            <>
                <ProgressIndicator
                    percentCompleted={percentCompleted}
                    startedOn={startedOn}
                    endsOn={endsOn}
                />
                <div className={styles.progressPercentageCompleted}>
                    {percentCompleted}%
                </div>
            </>
        );
    }

    return (
        <div className={styles.progressContainer}>
            <ProgressSlider
                value={progressValue}
                debounceSlider={debounceSlider}
                handleProgressChange={handleProgressChange}
                isLoading={isLoading}
            />
            <div className={styles.progressPercentageCompleted}>
                {progressValue}%
            </div>
        </div>
    );
};

export default Progressbar;
