// src/components/taskDetails/TaskDescription.tsx
import React from 'react';
import { Textarea } from './index';
import styles from './task-details.module.scss';

interface TaskDescriptionProps {
    isEditing: boolean;
    purpose: string;
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const TaskDescription: React.FC<TaskDescriptionProps> = ({
    isEditing,
    purpose,
    handleChange,
}) => {
    return (
        <div>
            {isEditing ? (
                <Textarea
                    name="purpose"
                    value={purpose}
                    onChange={handleChange}
                    testId="purpose-textarea"
                    placeholder="Enter task description"
                />
            ) : (
                <p className={styles.taskDescription}>
                    {purpose || 'No description available'}
                </p>
            )}
        </div>
    );
};

export default React.memo(TaskDescription);
