import { useState } from 'react';
import className from './tasksearch.module.scss';
import { TABS, Tab } from '@/interfaces/task.type';
import FilterModal from './FilterModal';

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
