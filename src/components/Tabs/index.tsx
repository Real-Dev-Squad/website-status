import styles from '@/components/Tabs/Tabs.module.scss';
import {
    Tab,
    depreciatedTaskStatus,
    newTaskStatus,
} from '@/interfaces/task.type';
import { getChangedStatusName } from '@/utils/getChangedStatusName';

type TabsProps = {
    dev?: boolean;
    tabs: Tab[];
    onSelect: (tab: Tab) => void;
    activeTab: Tab;
};

const Tabs = ({ dev, tabs, onSelect, activeTab }: TabsProps) => (
    <>
        {tabs
            .filter((tab: Tab) =>
                dev
                    ? !depreciatedTaskStatus.includes(tab)
                    : !newTaskStatus.includes(tab)
            )
            .map((tab: Tab) => (
                <button
                    key={tab}
                    onClick={() => onSelect(tab)}
                    className={`${styles.tabButton} ${
                        activeTab === tab ? styles.active : ''
                    }`}
                >
                    {getChangedStatusName(tab)}
                </button>
            ))}
    </>
);

export default Tabs;
