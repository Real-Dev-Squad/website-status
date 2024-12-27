import { FC } from 'react';

import { ProgressSliderProps } from '@/interfaces/task.type';
import styles from '@/components/tasks/card/card.module.scss';

const ProgressSlider: FC<ProgressSliderProps> = ({
    value,
    debounceSlider,
    handleProgressChange,
    isLoading,
}) => {
    return (
        <input
            className={styles.slider}
            type="range"
            value={value}
            min="0"
            max="100"
            step="10"
            onChange={(e) => handleProgressChange(e)}
            onTouchEnd={() => debounceSlider(1000)}
            onMouseUp={() => debounceSlider(1000)}
            disabled={isLoading}
            style={
                {
                    '--progress': `${value}%`,
                } as React.CSSProperties
            }
        />
    );
};

export default ProgressSlider;
