import { FC } from 'react';
import { useRouter } from 'next/router';
import { ProgressBarProps } from '@/interfaces/task.type';
import ProgressSlider from './ProgressSlider';
import ProgressIndicator from './ProgressIndicator';
import classNames from '@/components/tasks/card/card.module.scss';

const Progressbar: FC<ProgressBarProps> = ({
    progress,
    progressValue,
    percentCompleted,
    handleProgressChange,
    debounceSlider,
    startedOn,
    endsOn,
    isLoading,
}) => {
    const router = useRouter();
    const { dev } = router.query;
    if (progress && dev === 'true') {
        return (
            <>
                <ProgressSlider
                    value={progressValue}
                    debounceSlider={debounceSlider}
                    handleProgressChange={handleProgressChange}
                    isLoading={isLoading}
                />
                <div className={classNames.progressPercentageCompleted}>
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
            <div className={classNames.progressPercentageCompleted}>
                {progressValue}%
            </div>
        </>
    );
};

export default Progressbar;
