import React, { FC } from 'react';
import styles from './task-details.module.scss';
import { TaskDetailsProps } from '@/interfaces/taskDetails.type';

const Details: FC<TaskDetailsProps> = ({
    detailType,
    children,
    additionalChild,
    color = 'black',
    isUpperCase = false,
}) => {
    return (
        <div className={styles.detailsContainer}>
            <span className={styles.detailType}>{detailType}:</span>
            <span
                className={styles.detailValue}
                style={{
                    color: color,
                    textTransform: isUpperCase ? 'uppercase' : 'none',
                }}
            >
                {children ?? 'N/A'}
            </span>
            {additionalChild && <span>{additionalChild}</span>}
        </div>
    );
};

export default Details;
