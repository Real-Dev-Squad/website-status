import { FC } from 'react';

import styles from '@/components/tasks/card/card.module.scss';
import { ProgressIndicatorProps } from '@/interfaces/task.type';
import handleProgressColor from '@/utils/handleProgressColor';

const ProgressIndicator: FC<ProgressIndicatorProps> = ({
    percentCompleted,
    startedOn,
    endsOn,
}) => {
    const progressColor = handleProgressColor(
        percentCompleted,
        startedOn,
        endsOn
    );
    return (
        <div className={styles.progressIndicator}>
            <div
                className={`
                ${progressColor}
                ${styles.progressStyle}
                `}
                style={{
                    width: `${percentCompleted}%`,
                }}
            ></div>
        </div>
    );
};

export default ProgressIndicator;
