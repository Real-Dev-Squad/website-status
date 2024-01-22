import { TaskSearchOption } from '@/interfaces/searchOptions.type';
import { useRef } from 'react';
import styles from './pill.module.scss';

export interface PillProps {
    idx: number;
    option: TaskSearchOption;
    newPillValue: string;
    handleKeyPress: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    setNewPillValue: (input: string) => void;
    removePill: (idx: number) => void;
    selectedPill: false | number;
    pillToBeRemoved: number;
    setSelectedPill: (key: number | false) => void;
}

export default function RenderPills({
    idx,
    option,
    newPillValue,
    setNewPillValue,
    handleKeyPress,
    removePill,
    selectedPill,
    pillToBeRemoved,
    setSelectedPill,
}: PillProps) {
    const [field] = Object.keys(option);
    const value = option[field];
    const pillInputRef = useRef<HTMLInputElement>(null);
    if (selectedPill === idx) {
        pillInputRef.current?.focus();
    }
    const activatePillInEditMode = () => {
        setNewPillValue(`${field}:${value}`);
        setSelectedPill(idx);
    };
    return (
        <>
            {selectedPill === idx ? (
                <div
                    style={{
                        width: `${newPillValue.length * 0.95}ch`,
                    }}
                    className={styles['parent-pill']}
                >
                    <input
                        data-testid="pill-input"
                        ref={pillInputRef}
                        onChange={(e) => {
                            setNewPillValue(e.target.value);
                            e.preventDefault();
                        }}
                        onKeyDown={handleKeyPress}
                        defaultValue={`${field}:${value}`}
                        className={`task-search-input ${styles['pill-input']}`}
                    />
                </div>
            ) : (
                <div
                    data-testid="parent-pill"
                    className={`parent-pill ${styles['parent-pill']} ${
                        styles['selected-options']
                    } ${pillToBeRemoved == idx ? styles['highlight'] : ''}`}
                >
                    <span
                        data-testid="pill-content"
                        onClick={activatePillInEditMode}
                        className={styles['pill-content']}
                    >
                        {' '}
                        {`${field}:${value}`}
                    </span>
                    <button
                        data-testid="delete-pill-button"
                        onClick={(e) => {
                            e.stopPropagation();
                            removePill(idx);
                        }}
                        className={styles['delete-option']}
                    >
                        <svg
                            className="svg-icon iconClearSm pe-none"
                            width="12"
                            height="12"
                            viewBox="0 0 14 14"
                        >
                            <path d="M12 3.41L10.59 2 7 5.59 3.41 2 2 3.41 5.59 7 2 10.59 3.41 12 7 8.41 10.59 12 12 10.59 8.41 7z"></path>
                        </svg>
                    </button>
                </div>
            )}
        </>
    );
}
