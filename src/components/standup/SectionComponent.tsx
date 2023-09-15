import { FC } from 'react';
import styles from '@/components/standup/standupContainer.module.scss';
import { SectionComponentProps } from '@/types/standup.type';

const SectionComponent: FC<SectionComponentProps> = ({
    section,
    sectionIndex,
    onInputChange,
    onAddField,
    onRemoveField,
}) => {
    return (
        <div className={styles.formFields}>
            <label className={styles.updateHeading} htmlFor={section.title}>
                {section.title}
            </label>
            <div className={styles.inputContainers}>
                <div className={styles.inputBoxContainer}>
                    {section.inputs.map((inputValue, inputIndex) => (
                        <div
                            key={inputIndex}
                            className={styles.inputAndButtons}
                        >
                            <div className={styles.inputBox}>
                                <input
                                    className={styles.inputField}
                                    data-testid={`${section.title}${inputIndex}`}
                                    name={section.title}
                                    type="text"
                                    required
                                    value={inputValue}
                                    onChange={(e) =>
                                        onInputChange(
                                            sectionIndex,
                                            inputIndex,
                                            e.target.value
                                        )
                                    }
                                />
                            </div>
                            <div className={styles.buttonsContainer}>
                                {inputIndex === section.inputs.length - 1 && (
                                    <button
                                        className={styles.addButton}
                                        type="button"
                                        onClick={() => onAddField(sectionIndex)}
                                    >
                                        +
                                    </button>
                                )}
                                {inputIndex === section.inputs.length - 1 &&
                                    section.inputs.length > 1 && (
                                        <button
                                            type="button"
                                            className={styles.removeButton}
                                            onClick={() =>
                                                onRemoveField(sectionIndex)
                                            }
                                        >
                                            x
                                        </button>
                                    )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SectionComponent;
