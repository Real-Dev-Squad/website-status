import { ProgressBarProps } from '@/interfaces/task.type';
import { FC } from 'react';
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
}) => {
    if (progress) {
        return (
            <>
                <ProgressSlider
                    value={progressValue}
                    debounceSlider={debounceSlider}
                    handleProgressChange={handleProgressChange}
                />
                <span>{progressValue}%</span>
            </>
        );
    } else {
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
    }
};

export default HandleProgressbar;
