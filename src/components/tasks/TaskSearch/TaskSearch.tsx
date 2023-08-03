import { useState } from 'react';
import className from './tasksearch.module.scss';
import { Tab } from '@/interfaces/task.type';

type FilterModalProps = {
    tabs: Tab[];
    onSelect: (tab: Tab) => void;
};

const FilterModal = ({ tabs, onSelect }: FilterModalProps) => {
    return (
        <div className={className['filter-modal']}>
            <div className={className['filter-modal-title']}>
                <span>Filter</span>
                <span className={className['close-button']}>&times;</span>
            </div>
            <div className={className['status-filter']}>
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        className={className['status-button']}
                        onClick={() => onSelect(tab)}
                    >
                        {tab}
                    </button>
                ))}
            </div>
        </div>
    );
};

type TaskSearchProps = {
    tabs: Tab[];
    filterStatusHandler: (tab: Tab) => void;
    inputOnChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
    inputedValue: string;
};

const TaskSearch = ({
    tabs,
    filterStatusHandler,
    inputOnChangeHandler,
    inputedValue,
}: TaskSearchProps) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalOpen = () => {
        setModalOpen(!modalOpen);
    };

    return (
        <div className={className['task-search-container']}>
            {/* Use a div or any other suitable element instead of <button> */}
            <div className={className['filter-container']}>
                <div
                    className={className['filter-button']}
                    onClick={handleModalOpen}
                >
                    Filter
                    {modalOpen && (
                        <FilterModal
                            tabs={tabs}
                            onSelect={filterStatusHandler}
                        />
                    )}
                </div>

                <input
                    className={className['search-input']}
                    type="text"
                    placeholder="Eg: is:active assignee:sunny-s key:task"
                    onChange={inputOnChangeHandler}
                    value={inputedValue}
                />
            </div>
            <div className="buttons">
                <button className={className['search-button']}>Search</button>
            </div>
        </div>
    );
};

export default TaskSearch;
