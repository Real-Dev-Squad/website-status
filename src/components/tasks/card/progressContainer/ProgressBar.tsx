import { FC, useState, useEffect } from 'react';
import { ProgressBarProps } from '@/interfaces/task.type';
import ProgressSlider from './ProgressSlider';
import ProgressIndicator from './ProgressIndicator';
import CompletionModal from '@/components/Modal/CompletionModal';
import styles from '@/components/tasks/card/card.module.scss';

interface ExtendedProgressBarProps extends ProgressBarProps {
    readOnly?: boolean;
    onStatusChange?: () => void;
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
    onStatusChange,
}) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (progressValue === 100 && !readOnly) {
            setShowModal(true);
        }
    }, [progressValue, readOnly]);

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

            <CompletionModal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                onStatusChange={() => onStatusChange?.()}
            />
        </div>
    );
};

export default Progressbar;
