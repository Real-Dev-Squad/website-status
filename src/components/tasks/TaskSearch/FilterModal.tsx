import className from './tasksearch.module.scss';
import {
    Tab,
    depreciatedTaskStatus,
    newTaskStatus,
} from '@/interfaces/task.type';
import { getChangedStatusName } from '@/utils/getChangedStatusName';

type FilterModalProps = {
    tabs: Tab[];
    onSelect: (tab: Tab) => void;
    activeTab?: Tab;
    onClose: () => void;
    dev?: boolean;
};

const FilterModal = ({
    tabs,
    onSelect,
    activeTab,
    onClose,
    dev,
}: FilterModalProps) => {
    return (
        <div className={className['filter-modal']} data-testid="filter-modal">
            <div className={className['filter-modal-title']}>
                <span>Filter</span>
                <span className={className['close-button']} onClick={onClose}>
                    &times;
                </span>
            </div>
            <div className={className['status-filter']}>
                {tabs
                    .filter((tab: Tab) =>
                        dev
                            ? !depreciatedTaskStatus.includes(tab)
                            : !newTaskStatus.includes(tab)
                    )
                    .map((tab) => (
                        <button
                            key={tab}
                            className={`${className['status-button']} ${
                                activeTab === tab
                                    ? className['status-button-active']
                                    : ''
                            }`}
                            onClick={() => {
                                onSelect(tab);
                                onClose();
                            }}
                        >
                            {getChangedStatusName(tab)}
                        </button>
                    ))}
            </div>
        </div>
    );
};

export default FilterModal;
