import React, { FC } from 'react';
import setColor from './taskPriorityColors';
import classNames from './task-details.module.scss';
import { TaskDetailsProps } from '@/interfaces/taskDetails.type';

const Details: FC<TaskDetailsProps> = ({ detailType, value }) => {
    return (
        <div>
            <span className={classNames.detailType}>{detailType}:</span>
            <span
                className={classNames.detailValue}
                style={{ color: setColor?.[value] ?? 'black' }}
            >
                {value ?? 'N/A'}
            </span>
        </div>
    );
};

export default Details;
