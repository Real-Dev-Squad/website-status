import React from 'react';
import { Button, Textarea } from './index';
import styles from './task-details.module.scss';

interface TaskHeaderProps {
    isEditing: boolean;
    setIsEditing: (isEditing: boolean) => void;
    onSave: () => void;
    onCancel: () => void;
    title: string;
    handleChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    isUserAuthorized: boolean;
    loading?: boolean;
}

export const TaskHeader: React.FC<TaskHeaderProps> = ({
    isEditing,
    setIsEditing,
    onSave,
    onCancel,
    title,
    handleChange,
    isUserAuthorized,
    loading,
}) => {
    if (isEditing) {
        return (
            <div className={styles.titleContainer}>
                <Textarea
                    name="title"
                    value={title}
                    onChange={handleChange}
                    testId="title-textarea"
                    placeholder="Enter task title"
                />
                <div className={styles.editMode}>
                    <Button buttonName="Cancel" clickHandler={onCancel} />
                    <Button
                        buttonName={loading ? 'Saving...' : 'Save'}
                        disabled={loading}
                        clickHandler={onSave}
                    />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.titleContainer}>
            <span data-testid="task-title" className={styles.taskTitle}>
                {title}
            </span>
            {isUserAuthorized && (
                <Button
                    buttonName="Edit"
                    clickHandler={setIsEditing}
                    value={true}
                    className={styles.editButton}
                />
            )}
        </div>
    );
};
