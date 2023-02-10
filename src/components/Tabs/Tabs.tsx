import React from "react";
import styles from '@/components/Tabs/tabs.module.scss';

interface Props {
  active: number;
  onChange: (index: number) => void;
  children: JSX.Element[];
  tabsChildrenClassName?: string;
  tabContainerClassName?: string;
  tabButtonClassName?: string
}

const Tabs: React.FC<Props> = ({ active, onChange, children, tabsChildrenClassName = "", tabContainerClassName = "", tabButtonClassName }) => {
  return (
    <>
      <div className={styles.tabContainerClassName} >
        {children.map((child: JSX.Element, index) => (
          <button
            onClick={() => onChange(index)}
            className={`${styles.tabButton} ${active === index && styles.activeTab} ${styles.tabButtonClassName}`}
            key={index}
          >
            {child?.props?.title}
          </button>
        ))}
      </div>
      <div className={styles.tabsChildrenClassName}>{children[active]}</div>
    </>
  );
};

export default Tabs;
