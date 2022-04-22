import React, { VFC, useState, PropsWithChildren } from 'react';
import styles from '@/components/Accordion/Accordion.module.scss';

type AccordionProps = {
  title: string,
  open: boolean,
};

export type Props = PropsWithChildren<AccordionProps>

const Accordion: VFC<Props> = ({ title, open = true, children }) => {
  const [isOpen, setIsOpen] = useState(open);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div aria-expanded={isOpen} data-testid="accordion" className={styles.container}>
      <div
        className={styles.title}
        onClick={toggle}
        onKeyDown={toggle}
        tabIndex={0}
        role="button"
      >
        {title}
        <span>{isOpen ? '-' : '+'}</span>
      </div>
      <div data-testid="accordion-content" className={`${styles.content} ${isOpen ? styles.open : styles.close}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
