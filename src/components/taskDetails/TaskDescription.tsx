import React from 'react';
import { Textarea } from './index';
import styles from './task-details.module.scss';

interface TaskDescriptionProps {
    isEditing: boolean;
    purpose: string;
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TaskDescription: React.FC<TaskDescriptionProps> = ({
    isEditing,
    purpose,
    handleChange,
}) => {
    if (isEditing) {
        return (
            <Textarea
                name="purpose"
                value={purpose}
                onChange={handleChange}
                testId="purpose-textarea"
                placeholder="Enter task description"
            />
        );
    }

    return (
        <p className={styles.taskDescription}>
            {purpose || 'No description available'}
        </p>
    );
};
