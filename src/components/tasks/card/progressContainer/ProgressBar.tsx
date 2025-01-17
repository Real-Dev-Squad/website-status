import { FC, useState, useEffect } from 'react';
import { ProgressBarProps } from '@/interfaces/task.type';
import { IoMdClose } from 'react-icons/io';
import { MdCheck } from 'react-icons/md';
import { FaCircleCheck } from 'react-icons/fa6';
import ProgressSlider from './ProgressSlider';
import ProgressIndicator from './ProgressIndicator';
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
    const [showDialog, setShowDialog] = useState(false);

    useEffect(() => {
        if (progressValue === 100 && !readOnly) {
            setShowDialog(true);
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

            {/* Completion Dialog */}
            {showDialog && (
                <div className={styles.dialogOverlay}>
                    <div className={styles.dialogBox}>
                        <FaCircleCheck className={styles.checkIcon} />
                        <h3 style={{ fontFamily: 'cursive' }}>
                            Congratulations!
                        </h3>
                        <p
                            style={{
                                fontWeight: 'bold',
                                fontFamily: 'cursive',
                            }}
                        >
                            You have achieved 100% completion! Would you like to
                            update your status?
                        </p>
                        <div className={styles.dialogButtons}>
                            <button
                                className={styles.changeStatusButton}
                                onClick={() => {
                                    onStatusChange?.();
                                    setShowDialog(false);
                                }}
                            >
                                <MdCheck /> Change Status
                            </button>
                            <button
                                className={styles.closeButton}
                                onClick={() => setShowDialog(false)}
                            >
                                <IoMdClose /> Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Progressbar;
