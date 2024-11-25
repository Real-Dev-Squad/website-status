import { FC } from 'react';

import { ProgressSliderProps } from '@/interfaces/task.type';
import styles from '@/components/tasks/card/card.module.scss';
import { useRouter } from 'next/router';

const ProgressSlider: FC<ProgressSliderProps> = ({
    value,
    debounceSlider,
    handleProgressChange,
    isLoading,
}) => {
    const { query } = useRouter();
    const isDev = query.dev === 'true';
    return (
        <>
            {
                isDev ? <input
                    className={styles.slider
                    }
                    type="range"
                    value={value}
                    min="0"
                    max="100"
                    step="10"
                    onChange={(e) => handleProgressChange(e)}
                    onMouseUp={() => debounceSlider(1000)}
                    disabled={isLoading}
                    style={
                        {
                            '--progress': `${value}%`,
                        } as React.CSSProperties
                    }
                /> : <input
                    type="range"
                    value={value}
                    min="0"
                    max="100"
                    step="10"
                    onChange={(e) => handleProgressChange(e)}
                    onMouseUp={() => debounceSlider(1000)}
                    disabled={isLoading}
                />
            }


        </>
    );
};

export default ProgressSlider;
