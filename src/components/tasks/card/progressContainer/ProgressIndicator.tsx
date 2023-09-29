import { FC } from 'react';

import classNames from '@/components/tasks/card/card.module.scss';
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
        <div className={classNames.progressIndicator}>
            {progressColor}
            <div
                className={`
                ${progressColor}
                ${classNames.progressStyle}
                `}
                style={{
                    width: `${percentCompleted}%`,
                }}
            ></div>
        </div>
    );
};

export default ProgressIndicator;
