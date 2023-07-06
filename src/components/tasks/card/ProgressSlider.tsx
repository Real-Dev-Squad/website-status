import { FC } from 'react';

import { ProgressSliderProps } from '@/interfaces/task.type';

const ProgressSlider: FC<ProgressSliderProps> = ({
    value,
    debounceSlider,
    handleProgressChange,
}) => {
    return (
        <>
            <input
                type="range"
                value={value}
                min="0"
                max="100"
                step="10"
                onChange={handleProgressChange}
                onMouseUp={() => debounceSlider(1000)}
                role="slider"
            />
        </>

    );
};

export default ProgressSlider;
