import React from 'react';
import Details from './Details';
import styles from './task-details.module.scss';
import { TASK_EXTENSION_REQUEST_URL } from '@/constants/url';
import convertTimeStamp from '@/helperFunctions/convertTimeStamp';

interface TaskDatesProps {
    isEditing: boolean;
    isUserAuthorized: boolean;
    startedOn: string;
    endsOn: number;
    newEndOnDate: string;
    setNewEndOnDate: (date: string) => void;
    handleBlurOfEndsOn: () => void;
    isExtensionRequestPending: boolean;
    taskId: string;
}

const TaskDates: React.FC<TaskDatesProps> = ({
    isEditing,
    isUserAuthorized,
    startedOn,
    endsOn,
    newEndOnDate,
    setNewEndOnDate,
    handleBlurOfEndsOn,
    isExtensionRequestPending,
    taskId,
}) => {
    const getExtensionRequestLink = (
        taskId: string,
        isExtensionRequestPending?: boolean
    ) => {
        return isExtensionRequestPending
            ? `${TASK_EXTENSION_REQUEST_URL}?&q=${encodeURIComponent(
                  `taskId:${taskId},status:PENDING`
              )}`
            : null;
    };

    const formattedEndsOn = endsOn ? convertTimeStamp(endsOn) : 'TBD';

    return (
        <div>
            <Details detailType={'Started On'} value={startedOn} />
            <div className={styles.inputContainer}>
                <Details
                    detailType={'Ends On'}
                    value={formattedEndsOn}
                    url={getExtensionRequestLink(
                        taskId,
                        isExtensionRequestPending
                    )}
                />
                {isEditing && isUserAuthorized && (
                    <input
                        id="endsOnTaskDetails"
                        type="date"
                        name="endsOn"
                        onChange={(e) => setNewEndOnDate(e.target.value)}
                        onBlur={handleBlurOfEndsOn}
                        value={newEndOnDate}
                        data-testid="endsOnTaskDetails"
                        className={styles.inputField}
                    />
                )}
            </div>
        </div>
    );
};

export default React.memo(TaskDates);
