import React, { useRef } from 'react';
import Suggestions from '../tasks/SuggestionBox/Suggestions';
import styles from './task-details.module.scss';

interface TaskParticipantsProps {
    isEditing: boolean;
    isUserAuthorized: boolean;
    assigneeName: string;
    showSuggestion: boolean;
    handleAssignment: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleAssigneSelect: (userName: string) => void;
    setShowSuggestion: (show: boolean) => void;
}

const TaskParticipants: React.FC<TaskParticipantsProps> = ({
    isEditing,
    isUserAuthorized,
    assigneeName,
    showSuggestion,
    handleAssignment,
    handleAssigneSelect,
    setShowSuggestion,
}) => {
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <div>
            <div className={styles.inputContainer}>
                <label htmlFor="assigneeInput" className={styles.detailType}>
                    Assignee:
                </label>
                <div className={styles.inputContainer}>
                    {isEditing && isUserAuthorized ? (
                        <Suggestions
                            handleClick={handleAssigneSelect}
                            assigneeName={assigneeName}
                            showSuggestion={showSuggestion}
                            handleAssignment={handleAssignment}
                            setShowSuggestion={setShowSuggestion}
                            ref={inputRef}
                        />
                    ) : (
                        <span className={styles.detailValue}>
                            {assigneeName}
                        </span>
                    )}
                </div>
            </div>
            <div className={styles.inputContainer}>
                <label className={styles.detailType}>Reporter:</label>
                <span className={styles.detailValue}>Ankush</span>
            </div>
        </div>
    );
};

export default React.memo(TaskParticipants);
