import React from 'react';
import Details from './Details';
import styles from './task-details.module.scss';
import { TASK_EXTENSION_REQUEST_URL } from '@/constants/url';
import { STARTED_ON, ENDS_ON } from '@/constants/constants';
import convertTimeStamp from '@/helperFunctions/convertTimeStamp';
import task from '@/interfaces/task.type';

interface TaskDatesProps {
    isEditing: boolean;
    startedOn: string;
    endsOn: number | null;
    isExtensionRequestPending: boolean;
    taskId: string;
    setEditedTaskDetails: React.Dispatch<React.SetStateAction<task>>;
}

export const TaskDates: React.FC<TaskDatesProps> = ({
    isEditing,
    startedOn,
    endsOn,
    isExtensionRequestPending,
    taskId,
    setEditedTaskDetails,
}) => {
    const formattedEndsOn = endsOn ? convertTimeStamp(endsOn) : 'TBD';
    const url = isExtensionRequestPending
        ? `${TASK_EXTENSION_REQUEST_URL}?&q=${encodeURIComponent(
              `taskId:${taskId},status:PENDING`
          )}`
        : null;

    return (
        <>
            <div className={styles.inputContainer}>
                <Details detailType={STARTED_ON} value={startedOn} />
            </div>
            <div className={styles.inputContainer}>
                <Details
                    detailType={ENDS_ON}
                    value={formattedEndsOn}
                    url={url}
                    isEditing={isEditing}
                    setEditedTaskDetails={setEditedTaskDetails}
                />
            </div>
        </>
    );
};
