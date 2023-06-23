import styles from '@/components/Tabs/Tabs.module.scss';
import { COMPLETED, DONE, AVAILABLE, UNASSINGED } from '@/constants/constants';
import { Tab, tasksCountObject } from '@/interfaces/task.type';
import { useRouter } from 'next/router';

type TabsProps = {
    tabs: Tab[];
    onSelect: (tab: Tab) => void;
    activeTab: Tab;
    tasksCount: tasksCountObject;
};
function changeName(name: string) {
    if (name === COMPLETED) {
        return DONE;
    } else if (name === AVAILABLE) {
        return UNASSINGED;
    } else {
        return name.split('_').join(' ');
    }
}

const Tabs = ({ tabs, onSelect, activeTab, tasksCount }: TabsProps) => {
    const router = useRouter();
    const { query } = router;
    const isFeatureFlagOn = query.dev === 'true';
    return (
        <>
            {tabs.map((tab: Tab) => (
                <button
                    key={tab}
                    onClick={() => onSelect(tab)}
                    className={`
                    ${
                        isFeatureFlagOn
                            ? styles.featureFlagTabButton
                            : styles.tabButton
                    }
                    ${
                        activeTab === tab
                            ? isFeatureFlagOn
                                ? styles.featureFlagActiveTab
                                : styles.active
                            : ''
                    }
                    `}
                >
                    {isFeatureFlagOn
                        ? `${tab} (${tasksCount[tab]})`
                        : changeName(tab)}
                </button>
            ))}
        </>
    );
};

export default Tabs;
