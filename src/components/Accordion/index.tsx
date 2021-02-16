import React, { FC, useState } from 'react';
import styles from '@/components/Accordion/Accordion.module.scss';

type Props = {
  title: string,
};

const Accordion: FC<Props> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  function toggle() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={styles.container}>
      <div
        className={styles.title}
        onClick={toggle}
        onKeyDown={toggle}
        tabIndex={0}
        role="button"
      >
        {title}
        <span>{ isOpen ? '-' : '+' }</span>
      </div>
      <div className={`${styles.content} ${isOpen ? styles.open : styles.close}`}>
        {children}
      </div>
    </div>
  );
};

export default Accordion;
