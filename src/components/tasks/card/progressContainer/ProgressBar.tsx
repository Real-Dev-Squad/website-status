import { FC } from 'react';
import { ProgressBarProps } from '@/interfaces/task.type';
import ProgressSlider from './ProgressSlider';
import ProgressIndicator from './ProgressIndicator';
import styles from '@/components/tasks/card/card.module.scss';

interface ExtendedProgressBarProps extends ProgressBarProps {
    readOnly?: boolean;
}

const Progressbar: FC<ExtendedProgressBarProps> = ({
    progress,
    progressValue,
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
                    percentCompleted={progressValue}
                    startedOn={startedOn}
                    endsOn={endsOn}
                />
                <div className={styles.progressPercentageCompleted}>
                    {progressValue}%
                </div>
            </>
        );
    }

    // Show slider when in edit mode
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
};

export default Progressbar;
