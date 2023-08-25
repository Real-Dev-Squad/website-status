import { TABS, Tab } from '@/interfaces/task.type';
import classNames from '@/styles/tasks.module.scss';
import Tabs from '../Tabs';
export const TabSection = ({
    dev,
    onSelect,
    activeTab,
}: {
    onSelect: (tab: Tab) => void;
    activeTab: Tab;
    dev?: boolean;
}) => {
    return (
        <div className={classNames.tabsContainer} data-testid="tabs">
            <Tabs
                dev={dev}
                tabs={TABS as Tab[]}
                onSelect={onSelect}
                activeTab={activeTab}
            />
        </div>
    );
};
