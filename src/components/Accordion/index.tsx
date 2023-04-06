import React, { VFC, useState, PropsWithChildren, KeyboardEvent } from 'react';
import styles from '@/components/Accordion/Accordion.module.scss';
import { ENTER_KEY, SPACE_KEY } from '@/components/constants/key';

type AccordionProps = {
    title: string;
    open: boolean;
};

export type Props = PropsWithChildren<AccordionProps>;

const Accordion: VFC<Props> = ({ title, open = true, children }) => {
    const [isOpen, setIsOpen] = useState(open);

    function toggle() {
        setIsOpen(!isOpen);
    }

    function keyDownToggle(e: KeyboardEvent) {
        const { key } = e;
        if (key === ENTER_KEY || key === SPACE_KEY) {
            e.preventDefault();
            e.stopPropagation();
            setIsOpen(!isOpen);
        }
    }

    return (
        <div
            aria-expanded={isOpen}
            data-testid="accordion"
            className={styles.container}
        >
            <div
                className={styles.title}
                onClick={toggle}
                onKeyDown={keyDownToggle}
                tabIndex={0}
                role="button"
            >
                {title}
                <span>{isOpen ? '-' : '+'}</span>
            </div>
            <div
                data-testid="accordion-content"
                className={`${styles.content} ${
                    isOpen ? styles.open : styles.close
                }`}
            >
                {children}
            </div>
        </div>
    );
};

export default Accordion;
