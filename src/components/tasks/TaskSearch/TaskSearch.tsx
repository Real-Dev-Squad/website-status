import { useState } from 'react';
import className from './tasksearch.module.scss';
import { TABS, Tab } from '@/interfaces/task.type';
import { getChangedStatusName } from '@/utils/getChangedStatusName';
// TaskSearch component
// ...

type FilterModalProps = {
    tabs: Tab[];
    onSelect: (tab: Tab) => void;
    activeTab?: Tab;
    onClose: () => void;
};

const FilterModal = ({
    tabs,
    onSelect,
    activeTab,
    onClose,
}: FilterModalProps) => {
    return (
        <div className={className['filter-modal']}>
            <div className={className['filter-modal-title']}>
                <span>Filter</span>
                <span className={className['close-button']} onClick={onClose}>
                    &times;
                </span>
            </div>
            <div className={className['status-filter']}>
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={`${className['status-button']} ${
                            activeTab === tab
                                ? className['status-button-active']
                                : ''
                        }`}
                        onClick={() => {
                            onSelect(tab); // Call the onSelect function with the selected tab
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

type TaskSearchProps = {
    onSelect: (tab: Tab) => void; // Add the tab parameter to the onSelect function
    inputOnChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputtedValue: string;
    activeTab?: Tab;
};

const TaskSearch = ({
    onSelect,
    inputOnChangeHandler,
    inputtedValue,
    activeTab,
}: TaskSearchProps) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    return (
        <div className={className['task-search-container']}>
            <div className={className['filter-container']}>
                <div
                    className={className['filter-button']}
                    onClick={handleModalOpen}
                >
                    Filter
                    {modalOpen && (
                        <FilterModal
                            tabs={TABS as Tab[]}
                            onSelect={onSelect}
                            activeTab={activeTab}
                            onClose={handleModalClose}
                        />
                    )}
                </div>

                <input
                    className={className['search-input']}
                    type="text"
                    placeholder="Eg: is:active assignee:sunny-s key:task"
                    onChange={inputOnChangeHandler}
                    value={inputtedValue}
                />
            </div>
            <div className="buttons">
                <button className={className['search-button']}>Search</button>
            </div>
        </div>
    );
};

export default TaskSearch;
