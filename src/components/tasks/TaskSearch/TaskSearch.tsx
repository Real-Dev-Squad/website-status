import { useState } from 'react';
import className from './tasksearch.module.scss';
import { TABS, Tab } from '@/interfaces/task.type';
import { getChangedStatusName } from '@/utils/getChangedStatusName';

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

type TaskSearchProps = {
    onSelect: (tab: Tab) => void;
    inputtedValue: string;
    activeTab?: Tab;
    onInputChange: (value: string) => void;
    onClickSearchButton: () => void;
};

const TaskSearch = ({
    onSelect,
    inputtedValue,
    activeTab,
    onInputChange,
    onClickSearchButton,
}: TaskSearchProps) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    };

    const handleModalClose = () => {
        setModalOpen(false);
    };

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onClickSearchButton();
        }
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
                    value={inputtedValue}
                    onChange={(e) => onInputChange(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
            </div>
            <div className="buttons">
                <button
                    className={className['search-button']}
                    onClick={onClickSearchButton}
                >
                    Search
                </button>
            </div>
        </div>
    );
};

export default TaskSearch;
