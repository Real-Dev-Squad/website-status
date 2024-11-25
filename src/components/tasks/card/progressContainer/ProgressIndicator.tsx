import { FC } from 'react';

import styles from '@/components/tasks/card/card.module.scss';
import { ProgressIndicatorProps } from '@/interfaces/task.type';
import handleProgressColor from '@/utils/handleProgressColor';
import { useRouter } from 'next/router';

const ProgressIndicator: FC<ProgressIndicatorProps> = ({
    percentCompleted,
    startedOn,
    endsOn,
}) => {
    const { query } = useRouter();
    const isDev = query.dev === 'true';
    const progressColor = handleProgressColor(
        percentCompleted,
        startedOn,
        endsOn
    );
    return (
        <div className={isDev ? styles.slider : styles.progressIndicator}>
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
