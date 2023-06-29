import { TABS, Tab, tasksCountObject } from '@/interfaces/task.type';
import classNames from '@/styles/tasks.module.scss';
import Tabs from '../Tabs';
export const TabSection = ({
    onSelect,
    activeTab,
    tasksCount,
}: {
    onSelect: (tab: Tab) => void;
    activeTab: Tab;
    tasksCount: tasksCountObject;
}) => {
    return (
        <div className={classNames.tabsContainer}>
            <Tabs
                tabs={TABS as Tab[]}
                onSelect={onSelect}
                activeTab={activeTab}
                tasksCount={tasksCount}
            />
        </div>
    );
};
