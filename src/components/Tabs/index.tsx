import styles from '@/components/Tabs/Tabs.module.scss';
import { Tab } from '@/interfaces/task.type';

type TabsProps = {
    tabs: Tab[];
    onSelect: (tab: Tab) => void;
    activeTab: Tab;
};

const Tabs = ({ tabs, onSelect, activeTab }: TabsProps) => (
    <>
        {tabs.map((tab: Tab) => (
            <button
                key={tab}
                onClick={() => onSelect(tab)}
                className={`${styles.tabButton} ${
                    activeTab === tab ? styles.active : ''
                }`}
            >
                {tab}
            </button>
        ))}
    </>
);

export default Tabs;
