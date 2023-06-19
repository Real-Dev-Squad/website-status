import { FC } from 'react';

import { ProgressSliderProps } from '@/interfaces/task.type';

const ProgressSlider: FC<ProgressSliderProps> = ({ value, debounceSlider }) => {
    return (
        <>
            <input
                type="range"
                value={value}
                min="0"
                max="100"
                step="10"
                onChange={(e) => debounceSlider(e, 500)}
            />
        </>
    );
};

export default ProgressSlider;
