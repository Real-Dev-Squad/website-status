import styles from '@/components/Tabs/Tabs.module.scss';
import { Tab } from '@/interfaces/task.type';
import { COMPLETED, DONE, AVAILABLE, UNASSINGED } from '@/constants/constants';

type TabsProps = {
    tabs: Tab[];
    onSelect: (tab: Tab) => void;
    activeTab: Tab;
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
                {changeName(tab)}
            </button>
        ))}
    </>
);

export default Tabs;
