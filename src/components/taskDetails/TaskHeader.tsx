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
}

const TaskHeader: React.FC<TaskHeaderProps> = ({
    isEditing,
    setIsEditing,
    onSave,
    onCancel,
    title,
    handleChange,
    isUserAuthorized,
}) => {
    return (
        <div className={styles.titleContainer}>
            {isEditing ? (
                <Textarea
                    name="title"
                    value={title}
                    onChange={handleChange}
                    testId="title-textarea"
                    placeholder="Enter task title"
                />
            ) : (
                <span data-testid="task-title" className={styles.taskTitle}>
                    {title}
                </span>
            )}
            {!isEditing && isUserAuthorized && (
                <Button
                    buttonName="Edit"
                    clickHandler={setIsEditing}
                    value={true}
                    className={styles.editButton}
                />
            )}
            {isEditing && (
                <div className={styles.editMode}>
                    <Button buttonName="Cancel" clickHandler={onCancel} />
                    <Button buttonName="Save" clickHandler={onSave} />
                </div>
            )}
        </div>
    );
};

export default React.memo(TaskHeader);
