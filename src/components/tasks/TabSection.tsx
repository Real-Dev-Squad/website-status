import { TABS, Tab } from '@/interfaces/task.type';
import styles from '@/styles/tasks.module.scss';
import Tabs from '../Tabs';
export const TabSection = ({
    onSelect,
    activeTab,
    dev,
}: {
    onSelect: (tab: Tab) => void;
    activeTab: Tab;
    dev?: boolean;
}) => {
    return (
        <div className={styles.tabsContainer} data-testid="tabs">
            <Tabs
                dev={dev}
                tabs={TABS as Tab[]}
                onSelect={onSelect}
                activeTab={activeTab}
            />
        </div>
    );
};
