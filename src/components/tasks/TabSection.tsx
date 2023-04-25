import { TABS, Tab } from '@/interfaces/task.type';
import classNames from '@/styles/tasks.module.scss';
import Tabs from '../Tabs';
export const TabSection = ({
    onSelect,
    activeTab,
}: {
    onSelect: (tab: Tab) => void;
    activeTab: Tab;
}) => {
    return (
        <div className={classNames.tabsContainer}>
            <Tabs
                tabs={TABS as Tab[]}
                onSelect={onSelect}
                activeTab={activeTab}
            />
        </div>
    );
};
