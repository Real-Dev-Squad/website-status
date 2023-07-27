import { useEffect, useRef, useState } from 'react';
import styles from './select.module.scss';
import { SelectOption, SelectProps } from '@/types/Select';

export function Select({ value, onChange, options }: SelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    function selectOption(option: SelectOption) {
        if (option !== value) onChange(option);
    }

    function onOptionClick(option: SelectOption) {
        selectOption(option);
        setIsOpen(false);
    }

    // Accessiblity
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            e.preventDefault();
            if (
                e.target != containerRef.current &&
                !containerRef?.current?.contains(e.target as Node)
            )
                return;

            switch (e.code) {
                case 'Enter':
                case 'Space':
                    if (isOpen) {
                        selectOption(options[highlightedIndex]);
                        setIsOpen(false);
                    }
                    break;
                case 'ArrowUp':
                case 'ArrowDown': {
                    if (!isOpen) {
                        setIsOpen(true);
                        break;
                    }

                    const newValue =
                        highlightedIndex + (e.code === 'ArrowDown' ? 1 : -1);
                    if (newValue >= 0 && newValue < options.length) {
                        setHighlightedIndex(newValue);
                    }
                    break;
                }
                case 'Escape':
                    setIsOpen(false);
                    break;
            }
        };
        containerRef.current?.addEventListener('keydown', handler);

        return () => {
            containerRef.current?.removeEventListener('keydown', handler);
        };
    }, [isOpen, highlightedIndex, options]);

    return (
        <div
            ref={containerRef}
            onBlur={() => setIsOpen(false)}
            onClick={() => {
                setIsOpen((prev) => !prev);
            }}
            tabIndex={0}
            className={styles.container}
        >
            <button
                className={styles['selected-option-container']}
                data-testid="selected-option-container"
            >
                <span className={styles.value} data-testid="selected-option">
                    {value?.label}
                </span>
                <div className={styles.caret}></div>
            </button>
            <ul
                className={`${styles.options} ${isOpen ? styles.show : ''}`}
                data-testid="options"
            >
                {options.map((option, index) => (
                    <li
                        onClick={() => {
                            onOptionClick(option);
                        }}
                        onPointerEnter={() => {
                            onOptionClick(option);
                        }}
                        onMouseEnter={() => setHighlightedIndex(index)}
                        key={option.value}
                        className={`${
                            index === highlightedIndex ? styles.highlighted : ''
                        } ${styles.option}`}
                        style={{ cursor: 'pointer' }}
                    >
                        {option.label}
                    </li>
                ))}
            </ul>
        </div>
    );
}
