import { FC } from 'react';
import { useRouter } from 'next/router';
import { ProgressBarProps } from '@/interfaces/task.type';
import ProgressSlider from './ProgressSlider';
import ProgressIndicator from './ProgressIndicator';

const HandleProgressbar: FC<ProgressBarProps> = ({
    progress,
    progressValue,
    percentCompleted,
    handleProgressChange,
    debounceSlider,
    startedOn,
    endsOn,
    loading,
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
                    loading={loading}
                />
                <span>{progressValue}%</span>
            </>
        );
    }
    return (
        <>
            <ProgressIndicator
                percentCompleted={percentCompleted}
                startedOn={startedOn}
                endsOn={endsOn}
            />
            <span>{percentCompleted}% </span>
        </>
    );
};

export default HandleProgressbar;
