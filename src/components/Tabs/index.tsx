import styles from '@/components/Tabs/Tabs.module.scss';
import { TABS } from '@/interfaces/task.type';

type TabsProps = {
  tabs: typeof TABS;
  onSelect: (tab: string) => void;
  activeTab: string
};

const Tabs = ({ tabs, onSelect, activeTab }: TabsProps) =>
  <>
    {tabs.map((tab: string) => (
      <button
        key={tab}
        onClick={() => onSelect(tab)}
        className={`${styles.tabButton} ${activeTab === tab ? styles.active : ""}`}
      >
        {tab}
      </button>
    ))}
  </>

export default Tabs